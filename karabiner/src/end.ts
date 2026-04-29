import {
    writeToProfile,
    rule, map, mapConsumerKey, withMapper,
    FromKeyParam,
    toApp, ToEvent, ToKeyParam,
    ifApp, ifVar,
    mouseMotionToScroll,
    to$,
    simlayer,
} from 'karabiner.ts'
import { combi } from './combis';
import { ifLang, mapLangChars, mapLangHold } from './languages';
import { fullSimlayer, uniformSimlayer } from './layers';
import { tk, resolveChar, toDelayedSetVar } from './shared';
import { kVmapTextObjects, kVnnoremap, setWin, toHideKitty, toSynapse, toWooshy } from './apps';

const alpha = (from: FromKeyParam, to: ToKeyParam) => [
    map(from).to(to),
    map(from, '⇧').to(to, '⇧'),
];

writeToProfile('end.ts',
    [
        // THUMB KEYS ----------------------------------------------------------
        rule('thumb keys').manipulators([
            map('␣', 'left⌘').toIfAlone('␣', 'left⌘').toIfHeldDown('left⇧', 'left⌘'),
            map('␣', 'right⌘').toIfAlone('␣', 'right⌘').toIfHeldDown('left⇧', 'right⌘'),

            map('left⌘').to('left⌘').condition(ifApp('kitty').unless()).toIfAlone(toApp('kitty')),
            map('left⌘').to('left⌘').condition(ifApp('kitty')).toIfAlone(toHideKitty()),
            map('right⌘').to('right⌘').toIfAlone(toSynapse()),
            mouseMotionToScroll().modifiers('right⌘').options({ speed_multiplier: 2 }),

            mapLangHold('caps_lock', 'german'),
        ]),

        rule('media keys').manipulators([
            mapConsumerKey('volume_increment', '⇧').toConsumerKey('volume_decrement'),
            map(({ key_code: 'display_brightness_increment', modifiers: { mandatory: ['shift'] } } as any))
                .to(({ key_code: 'display_brightness_decrement' } as any)),
            map(({ key_code: 'apple_display_brightness_increment', modifiers: { mandatory: ['shift'] } } as any))
                .to(({ key_code: 'apple_display_brightness_decrement' } as any)),
            map(({ key_code: 'vk_consumer_brightness_up', modifiers: { mandatory: ['shift'] } } as any))
                .to(({ key_code: 'vk_consumer_brightness_down' } as any)),
            mapConsumerKey('mute')
                .to(to$('open -g hammerspoon://audio-output-toggle')),
            mapConsumerKey('play_or_pause')
                .to(to$('open -g hammerspoon://media-control?key=play_or_pause')),
        ]),


        // COMBI KEYS ----------------------------------------------------------
        rule('upper row combos').manipulators([
            // UPPER ROW
            combi('we').to('↑'),
            combi('er').to('→'),
            combi('ui').condition(ifApp('kitty')).to(tk('⌃_u')),
            combi('io').condition(ifApp('kitty')).to(tk('⌃_o')),
            combi('io').condition(ifApp('Xcode')).to(tk('⌘⇧_o')),

            // HOME ROW
            combi('sd').to('⇥'),
            combi('df').to('⌫'),
            combi('jk').to('⎋'),
            combi('kl').to('⏎'),

            // LOWER ROW
            combi('xc').to('←'),
            combi('cv').to('↓'),
            // tab switching complicated because it's different in xcode & kv
            // doesn't pass through control character
            // prev tab
            combi('m,').condition(ifApp('Xcode').unless()).to(tk('⌃⇧_⇥')),
            combi('m,').condition(ifApp('Xcode')).to(tk('⌘⇧_[')),
            // next tab
            combi(',.').condition(ifApp('Xcode').unless()).to(tk('⌃_⇥')),
            combi(',.').condition(ifApp('Xcode')).to(tk('⌘⇧_]')),
            // directory prefix
            combi('./').condition(ifApp('kitty')).to(resolveChar('~')).to('/')
                .condition(ifVar('path-prefix').unless())
                .toVar('path-prefix', true)
                .to(toDelayedSetVar('path-prefix', false)),
            map('/').condition(ifApp('kitty')).condition(ifVar('path-prefix', true))
                .to(resolveChar('_')).to('/')
                .toVar('path-prefix', false)
        ]),


        // LAYERS --------------------------------------------------------------
        // chars: trigger on left hand key, affect right hand only
        simlayer('a', 'char-mode-right').manipulators([
            withMapper({
                y: '#', u: '*', i: '[', o: ']',
                h: '%', j: '-', k: '(', l: ')',
                n: '&', m: '_', ',': '{', '.': '}'
            } as const)((k, v) => map(k).to(resolveChar(v))),
        ]),

        // numbers
        fullSimlayer<FromKeyParam, ToKeyParam>('z', 'number-mode', {
                  u: '7',  i: '8',  o: '9',
                  j: '4',  k: '5',  l: '6',
            n: '0', m: '1', ',': '2', '.': '3',
        } as const, (k, digit) => map(k).to(digit)),

        // gui
        fullSimlayer<FromKeyParam, ToEvent>('/', 'gui-mode', {
            q: tk('⌘_='),  w: tk('⌘_-'), e: setWin('0,0_1x1'), r: setWin('next_screen'), t: setWin('1,0_1x1'), y: setWin('0,0_2x1'),
            a: toWooshy(), s: tk('⌘_0'), d: setWin('0,0_1x2'), f: setWin('0,0_2x2'),     g: setWin('1,0_1x2'),
            z: tk('⌘_['),  x: tk('⌘_]'), c: setWin('0,1_1x1'), v: setWin('prev_screen'), b: setWin('1,1_1x1'), n: setWin('0,1_2x1'),
        } as const, (k, v) => map(k).to(v)),

        // control
        // doubled up so we can also press ctrl-q and ctrl-p
        uniformSimlayer('q', 'control-mode-q', (k) => map(k).to(tk(`⌃_${k as ToKeyParam}`))),
        uniformSimlayer('p', 'control-mode-p', (k) => map(k).to(tk(`⌃_${k as ToKeyParam}`))),

        // LANGUAGES -----------------------------------------------------------
        rule('german characters', ifLang('german')).manipulators([
            map('s').to(tk('⌥_s')).toUnsetVar('lang'),
            withMapper(['a', 'o', 'u'])((k) => mapLangChars(k, '⌥_u')),
        ]),

        // kindaVim ------------------------------------------------------------
        rule('kV nnoremap', kVnnoremap()).manipulators([
            map('y', '⇧').to('y').to(resolveChar('$')),
            map('j').to('g').to('j'),
            map('k').to('g').to('k'),
        ]),
        rule('kV text objects').manipulators([
            kVmapTextObjects({
                d: resolveChar("'"), s: resolveChar('"'), e: resolveChar('`'),
                l: resolveChar('('), o: resolveChar(']'), '.': resolveChar('}'),
            })
        ]),

        // BASE LAYOUT ---------------------------------------------------------
        // Keep this late so app rules, combos, language helpers, and simlayers
        // still match the physical source keys before the alpha remap runs.
        //
        // anymak:END 5-column alpha block adapted from the QWERTY test-drive:
        //   Q  K  O  U  Y     V  D  C  L  F
        //   H  A  E  I  ,     G  T  R  N  S
        //   /  Z  '  .  X     B  P  M  W  ;
        rule('anymak end alpha').manipulators([
            ...alpha('q', 'q'),
            ...alpha('w', 'k'),
            ...alpha('e', 'o'),
            ...alpha('r', 'u'),
            ...alpha('t', 'y'),

            ...alpha('a', 'h'),
            ...alpha('s', 'a'),
            ...alpha('d', 'e'),
            ...alpha('f', 'i'),
            ...alpha('g', ','),

            ...alpha('z', '/'),
            ...alpha('x', 'z'),
            ...alpha('c', "'"),
            ...alpha('v', '.'),
            ...alpha('b', 'x'),

            ...alpha('y', 'v'),
            ...alpha('u', 'd'),
            ...alpha('i', 'c'),
            ...alpha('o', 'l'),
            ...alpha('p', 'f'),

            ...alpha('h', 'g'),
            ...alpha('j', 't'),
            ...alpha('k', 'r'),
            ...alpha('l', 'n'),

            ...alpha('n', 'b'),
            ...alpha('m', 'p'),
            ...alpha(',', 'm'),
            ...alpha('.', 'w'),
            ...alpha('/', ';'),
        ]),

        // MISC ----------------------------------------------------------------
        rule('disable caps').manipulators([
            map('caps_lock', 'optionalAny').toNone()
        ]),
    ],
    {
       'basic.to_if_alone_timeout_milliseconds': 750,
       'basic.to_if_held_down_threshold_milliseconds': 80,
       'basic.to_delayed_action_delay_milliseconds': 500,
       'basic.simultaneous_threshold_milliseconds': 30,
    }
);
