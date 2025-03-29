export default function () {
  if (import.meta.env.VITE_DEV) {
    const logo = `
  __  __
 |  \\/  |   __ _   ___    ___    _ __
 | |\\/| |  / _\` | / __|  / _ \\  | '_ \\
 | |  | | | (_| | \\__ \\ | (_) | | | | |
 |_|  |_|  \\__,_| |___/  \\___/  |_| |_|

`

    const rainbowGradient = `
            background: linear-gradient(135deg, orange 60%, cyan);
            background-clip: text;
            color: transparent;
            font-size: 16px;
            line-height: 1;
            font-family: monospace;
            font-weight: 600;
`

    console.info(`%c${logo}`, rainbowGradient)
  } else if (import.meta.env.VITE_PROD) {
    console.log('[Mason Admin]:production mode...')
  }
}
