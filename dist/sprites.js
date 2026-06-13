// Each sprite is 5 lines tall, 12 wide (after {E} -> 1-char eye substitution).
// Line 0 is the hat slot — blank in resting frames; some fidget frames use it.
const BODIES = {
    duck: [
        ['            ', '    __      ', '  <({E} )___  ', '   (  ._>   ', '    `--´    '],
        ['            ', '    __      ', '  <({E} )___  ', '   (  ._>   ', '    `--´~   '],
        ['            ', '    __      ', '  <({E} )___  ', '   (  .__>  ', '    `--´    '],
    ],
    goose: [
        ['            ', '     ({E}>    ', '     ||     ', '   _(__)_   ', '    ^^^^    '],
        ['            ', '    ({E}>     ', '     ||     ', '   _(__)_   ', '    ^^^^    '],
        ['            ', '     ({E}>>   ', '     ||     ', '   _(__)_   ', '    ^^^^    '],
    ],
    blob: [
        ['            ', '   .----.   ', '  ( {E}  {E} )  ', '  (      )  ', '   `----´   '],
        ['            ', '  .------.  ', ' (  {E}  {E}  ) ', ' (        ) ', '  `------´  '],
        ['            ', '    .--.    ', '   ({E}  {E})   ', '   (    )   ', '    `--´    '],
    ],
    cat: [
        ['            ', '   /\\_/\\    ', '  ( {E}   {E})  ', '  (  ω  )   ', '  (")_(")   '],
        ['            ', '   /\\_/\\    ', '  ( {E}   {E})  ', '  (  ω  )   ', '  (")_(")~  '],
        ['            ', '   /\\-/\\    ', '  ( {E}   {E})  ', '  (  ω  )   ', '  (")_(")   '],
    ],
    dragon: [
        ['            ', '  /^\\  /^\\  ', ' <  {E}  {E}  > ', ' (   ~~   ) ', '  `-vvvv-´  '],
        ['            ', '  /^\\  /^\\  ', ' <  {E}  {E}  > ', ' (        ) ', '  `-vvvv-´  '],
        ['   ~    ~   ', '  /^\\  /^\\  ', ' <  {E}  {E}  > ', ' (   ~~   ) ', '  `-vvvv-´  '],
    ],
    octopus: [
        ['            ', '   .----.   ', '  ( {E}  {E} )  ', '  (______)  ', '  /\\/\\/\\/\\  '],
        ['            ', '   .----.   ', '  ( {E}  {E} )  ', '  (______)  ', '  \\/\\/\\/\\/  '],
        ['     o      ', '   .----.   ', '  ( {E}  {E} )  ', '  (______)  ', '  /\\/\\/\\/\\  '],
    ],
    owl: [
        ['            ', '   /\\  /\\   ', '  (({E})({E}))  ', '  (  ><  )  ', '   `----´   '],
        ['            ', '   /\\  /\\   ', '  (({E})({E}))  ', '  (  ><  )  ', '   .----.   '],
        ['            ', '   /\\  /\\   ', '  (({E})(-))  ', '  (  ><  )  ', '   `----´   '],
    ],
    penguin: [
        ['            ', '  .---.     ', '  ({E}>{E})     ', ' /(   )\\    ', '  `---´     '],
        ['            ', '  .---.     ', '  ({E}>{E})     ', ' |(   )|    ', '  `---´     '],
        ['  .---.     ', '  ({E}>{E})     ', ' /(   )\\    ', '  `---´     ', '   ~ ~      '],
    ],
    turtle: [
        ['            ', '   _,--._   ', '  ( {E}  {E} )  ', ' /[______]\\ ', '  ``    ``  '],
        ['            ', '   _,--._   ', '  ( {E}  {E} )  ', ' /[______]\\ ', '   ``  ``   '],
        ['            ', '   _,--._   ', '  ( {E}  {E} )  ', ' /[======]\\ ', '  ``    ``  '],
    ],
    snail: [
        ['            ', ' {E}    .--.  ', '  \\  ( @ )  ', '   \\_`--´   ', '  ~~~~~~~   '],
        ['            ', '  {E}   .--.  ', '  |  ( @ )  ', '   \\_`--´   ', '  ~~~~~~~   '],
        ['            ', ' {E}    .--.  ', '  \\  ( @  ) ', '   \\_`--´   ', '   ~~~~~~   '],
    ],
    ghost: [
        ['            ', '   .----.   ', '  / {E}  {E} \\  ', '  |      |  ', '  ~`~``~`~  '],
        ['            ', '   .----.   ', '  / {E}  {E} \\  ', '  |      |  ', '  `~`~~`~`  '],
        ['    ~  ~    ', '   .----.   ', '  / {E}  {E} \\  ', '  |      |  ', '  ~~`~~`~~  '],
    ],
    axolotl: [
        ['            ', '}~(______)~{', '}~({E} .. {E})~{', '  ( .--. )  ', '  (_/  \\_)  '],
        ['            ', '~}(______){~', '~}({E} .. {E}){~', '  ( .--. )  ', '  (_/  \\_)  '],
        ['            ', '}~(______)~{', '}~({E} .. {E})~{', '  (  --  )  ', '  ~_/  \\_~  '],
    ],
    capybara: [
        ['            ', '  n______n  ', ' ( {E}    {E} ) ', ' (   oo   ) ', '  `------´  '],
        ['            ', '  n______n  ', ' ( {E}    {E} ) ', ' (   Oo   ) ', '  `------´  '],
        ['    ~  ~    ', '  u______n  ', ' ( {E}    {E} ) ', ' (   oo   ) ', '  `------´  '],
    ],
    cactus: [
        ['            ', ' n  ____  n ', ' | |{E}  {E}| | ', ' |_|    |_| ', '   |    |   '],
        ['            ', '    ____    ', ' n |{E}  {E}| n ', ' |_|    |_| ', '   |    |   '],
        [' n        n ', ' |  ____  | ', ' | |{E}  {E}| | ', ' |_|    |_| ', '   |    |   '],
    ],
    robot: [
        ['            ', '   .[||].   ', '  [ {E}  {E} ]  ', '  [ ==== ]  ', '  `------´  '],
        ['            ', '   .[||].   ', '  [ {E}  {E} ]  ', '  [ -==- ]  ', '  `------´  '],
        ['     *      ', '   .[||].   ', '  [ {E}  {E} ]  ', '  [ ==== ]  ', '  `------´  '],
    ],
    rabbit: [
        ['            ', '   (\\__/)   ', '  ( {E}  {E} )  ', ' =(  ..  )= ', '  (")__(")  '],
        ['            ', '   (|__/)   ', '  ( {E}  {E} )  ', ' =(  ..  )= ', '  (")__(")  '],
        ['            ', '   (\\__/)   ', '  ( {E}  {E} )  ', ' =( .  . )= ', '  (")__(")  '],
    ],
    mushroom: [
        ['            ', ' .-o-OO-o-. ', '(__________)', '   |{E}  {E}|   ', '   |____|   '],
        ['            ', ' .-O-oo-O-. ', '(__________)', '   |{E}  {E}|   ', '   |____|   '],
        ['   . o  .   ', ' .-o-OO-o-. ', '(__________)', '   |{E}  {E}|   ', '   |____|   '],
    ],
    chonk: [
        ['            ', '  /\\    /\\  ', ' ( {E}    {E} ) ', ' (   ..   ) ', '  `------´  '],
        ['            ', '  /\\    /|  ', ' ( {E}    {E} ) ', ' (   ..   ) ', '  `------´  '],
        ['            ', '  /\\    /\\  ', ' ( {E}    {E} ) ', ' (   ..   ) ', '  `------´~ '],
    ],
};
const HAT_LINES = {
    none: '',
    crown: '   \\^^^/    ',
    tophat: '   [___]    ',
    propeller: '    -+-     ',
    halo: '   (   )    ',
    wizard: '    /^\\     ',
    beanie: '   (___)    ',
    tinyduck: '    ,>      ',
};
/** Render the full multi-line sprite for a given idle frame. */
export function renderSprite(bones, frame = 0) {
    const frames = BODIES[bones.species];
    const body = frames[frame % frames.length].map(line => line.replaceAll('{E}', bones.eye));
    const lines = [...body];
    // Apply the hat only when line 0 is empty in this frame.
    if (bones.hat !== 'none' && !lines[0].trim()) {
        lines[0] = HAT_LINES[bones.hat];
    }
    // Drop a fully blank hat row only when EVERY frame keeps line 0 blank,
    // otherwise sprite height would oscillate between frames.
    if (!lines[0].trim() && frames.every(f => !f[0].trim()))
        lines.shift();
    return lines;
}
export function spriteFrameCount(species) {
    return BODIES[species].length;
}
/** Compact one-line face, handy for inline status. */
export function renderFace(bones) {
    const e = bones.eye;
    switch (bones.species) {
        case 'duck':
        case 'goose':
            return `(${e}>`;
        case 'blob':
            return `(${e}${e})`;
        case 'cat':
            return `=${e}ω${e}=`;
        case 'dragon':
            return `<${e}~${e}>`;
        case 'octopus':
            return `~(${e}${e})~`;
        case 'owl':
            return `(${e})(${e})`;
        case 'penguin':
            return `(${e}>)`;
        case 'turtle':
            return `[${e}_${e}]`;
        case 'snail':
            return `${e}(@)`;
        case 'ghost':
            return `/${e}${e}\\`;
        case 'axolotl':
            return `}${e}.${e}{`;
        case 'capybara':
            return `(${e}oo${e})`;
        case 'cactus':
            return `|${e}  ${e}|`;
        case 'robot':
            return `[${e}${e}]`;
        case 'rabbit':
            return `(${e}..${e})`;
        case 'mushroom':
            return `|${e}  ${e}|`;
        case 'chonk':
            return `(${e}.${e})`;
    }
}
