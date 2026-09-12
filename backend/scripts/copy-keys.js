const fs = require('fs')
const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const srcKeysDir = path.join(rootDir, 'src', 'config', 'keys')
const distKeysDir = path.join(rootDir, 'dist', 'src', 'config', 'keys')
fs.mkdirSync(distKeysDir, { recursive: true })

for (const file of ['private-key.pem', 'public-key.pem']) {
  const srcPath = path.join(srcKeysDir, file)
  const distPath = path.join(distKeysDir, file)
  if (fs.existsSync(srcPath)) fs.copyFileSync(srcPath, distPath)
}
