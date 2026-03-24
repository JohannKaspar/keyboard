# Keyboard Layout Visualizations

These diagrams are source-backed views derived from the Karabiner config in `karabiner/src/keymap.ts`.

## Karabiner Base

Current base output with macOS German input source (`QWERTZ`):

```text
+------+------+------+------+------+    +------+------+------+------+------+
|  Q   |  W   |  E   |  R   |  T   |    |  Z   |  U   |  I   |  O   |  P   |
+------+------+------+------+------+    +------+------+------+------+------+
|  A   |  S   |  D   |  F   |  G   |    |  H   |  J   |  K   |  L   |  Ö   |
+------+------+------+------+------+    +------+------+------+------+------+
|  Y   |  X   |  C   |  V   |  B   |    |  N   |  M   |  ,   |  .   |  -   |
+------+------+------+------+------+    +------+------+------+------+------+
```

Karabiner source trigger grid from `karabiner/src/keymap.ts`:

```text
+------+------+------+------+------+    +------+------+------+------+------+
|  Q   |  W   |  E   |  R   |  T   |    |  Y   |  U   |  I   |  O   |  P   |
+------+------+------+------+------+    +------+------+------+------+------+
|  A   |  S   |  D   |  F   |  G   |    |  H   |  J   |  K   |  L   |  ;   |
+------+------+------+------+------+    +------+------+------+------+------+
|  Z   |  X   |  C   |  V   |  B   |    |  N   |  M   |  ,   |  .   |  /   |
+------+------+------+------+------+    +------+------+------+------+------+
```

The output diagram above shows what you type. The trigger grid below it is still the source of truth for combos and layer activators in the Karabiner config.

## Experimental anymak:END Alpha

`karabiner/src/end.ts` keeps the same thumbs, combos, layers, and app-specific rules as
`karabiner/src/keymap.ts`. Only the base alpha output changes.

```text
+------+------+------+------+------+    +------+------+------+------+------+
|  Q   |  K   |  O   |  U   |  Y   |    |  V   |  D   |  C   |  L   |  F   |
+------+------+------+------+------+    +------+------+------+------+------+
|  H   |  A   |  E   |  I   |  ,   |    |  G   |  T   |  R   |  N   |  S   |
+------+------+------+------+------+    +------+------+------+------+------+
|  ;   |  Z   |  J   |  .   |  X   |    |  B   |  P   |  M   |  W   |  /   |
+------+------+------+------+------+    +------+------+------+------+------+
```

Thumb and modifier behavior:

- `SPACE`: tap/hold -> space, but with `CMD` held a tap stays `CMD+SPACE` and a hold becomes `CMD+SHIFT`
- `L_CMD`: hold -> `L_CMD`, tap -> open/hide Kitty
- `R_CMD`: hold -> `R_CMD`, tap -> Synapse, plus mouse-motion scroll modifier
- `CAPS`: hold -> German accent mode

Combos:

- Upper row: `W+E` -> `UP`, `E+R` -> `RIGHT`, `U+I` -> Kitty `Ctrl+U`, `I+O` -> Kitty `Ctrl+O` or Xcode `Cmd+Shift+O`
- Home row: `S+D` -> `TAB`, `D+F` -> `BSPC`, `J+K` -> `ESC`, `K+L` -> `RET`
- Lower row: `X+C` -> `LEFT`, `C+V` -> `DOWN`, `M+,` -> previous tab, `,+.` -> next tab, `./` -> Kitty path prefix helper

## Karabiner Layers

Legend:

- `*` marks the hold key that activates the layer
- empty cells are explicitly unmapped in that layer

### Character Layer

Hold `A` or `;`:

```text
+------+------+------+------+------+    +------+------+------+------+------+
|      |  ~   |  `   |  ^   |  $   |    |  #   |  *   |  [   |  ]   |      |
+------+------+------+------+------+    +------+------+------+------+------+
|  A*  |  "   |  '   |  |   |  \   |    |  %   |  -   |  (   |  )   |  ;*  |
+------+------+------+------+------+    +------+------+------+------+------+
|      |  +   |  =   |  !   |  @   |    |  &   |  _   |  {   |  }   |      |
+------+------+------+------+------+    +------+------+------+------+------+
```

### Number Layer

Hold `Z`:

```text
+------+------+------+------+------+    +------+------+------+------+------+
|      |      |      |      |      |    |      |  7   |  8   |  9   |      |
+------+------+------+------+------+    +------+------+------+------+------+
|      |      |      |      |      |    |      |  4   |  5   |  6   |      |
+------+------+------+------+------+    +------+------+------+------+------+
|  Z*  |      |      |      |      |    |  0   |  1   |  2   |  3   |      |
+------+------+------+------+------+    +------+------+------+------+------+
```

### GUI Layer

Hold `/`:

```text
+------+------+------+------+------+    +------+------+------+------+------+
| Zoom+| Zoom-|  TL  | Next |  TR  |    | Top  |      |      |      |      |
+------+------+------+------+------+    +------+------+------+------+------+
|Wooshy| Cmd0 | Left | Full | Right|    |      |      |      |      |      |
+------+------+------+------+------+    +------+------+------+------+------+
| Cmd[ | Cmd] |  BL  | Prev |  BR  |    | Bot  |      |      |      |  /*  |
+------+------+------+------+------+    +------+------+------+------+------+
```

GUI legend:

- `TL` -> move window to `0,0_1x1`
- `TR` -> move window to `1,0_1x1`
- `BL` -> move window to `0,1_1x1`
- `BR` -> move window to `1,1_1x1`
- `Top` -> move window to `0,0_2x1`
- `Bot` -> move window to `0,1_2x1`
- `Left` -> move window to `0,0_1x2`
- `Right` -> move window to `1,0_1x2`
- `Full` -> move window to `0,0_2x2`
- `Next` / `Prev` -> move window to next / previous screen

### Control Layer Q

Hold `Q`:

```text
+------+------+------+------+------+    +------+------+------+------+------+
|  Q*  |Ctrl+W|Ctrl+E|Ctrl+R|Ctrl+T|    |Ctrl+Y|Ctrl+U|Ctrl+I|Ctrl+O|Ctrl+P|
+------+------+------+------+------+    +------+------+------+------+------+
|Ctrl+A|Ctrl+S|Ctrl+D|Ctrl+F|Ctrl+G|    |Ctrl+H|Ctrl+J|Ctrl+K|Ctrl+L|Ctrl+;|
+------+------+------+------+------+    +------+------+------+------+------+
|Ctrl+Z|Ctrl+X|Ctrl+C|Ctrl+V|Ctrl+B|    |Ctrl+N|Ctrl+M|Ctrl+,|Ctrl+.|Ctrl+/|
+------+------+------+------+------+    +------+------+------+------+------+
```

### Control Layer P

Hold `P`:

```text
+------+------+------+------+------+    +------+------+------+------+------+
|Ctrl+Q|Ctrl+W|Ctrl+E|Ctrl+R|Ctrl+T|    |Ctrl+Y|Ctrl+U|Ctrl+I|Ctrl+O|  P*  |
+------+------+------+------+------+    +------+------+------+------+------+
|Ctrl+A|Ctrl+S|Ctrl+D|Ctrl+F|Ctrl+G|    |Ctrl+H|Ctrl+J|Ctrl+K|Ctrl+L|Ctrl+;|
+------+------+------+------+------+    +------+------+------+------+------+
|Ctrl+Z|Ctrl+X|Ctrl+C|Ctrl+V|Ctrl+B|    |Ctrl+N|Ctrl+M|Ctrl+,|Ctrl+.|Ctrl+/|
+------+------+------+------+------+    +------+------+------+------+------+
```

## Language Helpers

Hold `CAPS` to enable temporary German accent mode:

- German while holding `CAPS`: `S` -> `ss`, `A/O/U` -> umlaut variants

## App-Specific Extras

`kindaVim` additions in `karabiner/src/keymap.ts`:

- `Shift+Y` -> `y$`
- `J` -> `gj`
- `K` -> `gk`
- text objects: `d` `'`, `s` `"`, `e` `` ` ``, `l` `(`, `o` `]`, `.` `}`
