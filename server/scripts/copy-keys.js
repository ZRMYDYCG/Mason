const fs = require('fs')
const path = require('path')

// Calculate project root directory (current script is in scripts/, so go up one level)
const rootDir = path.resolve(__dirname, '..')

const srcKeysDir = path.join(rootDir, 'src', 'config', 'keys')
const distKeysDir = path.join(rootDir, 'dist', 'src', 'config', 'keys')

// 1. Ensure target directory exists (use Sync to ensure directory is ready before writing)
try {
  fs.mkdirSync(distKeysDir, { recursive: true })
} catch (err) {
  console.error('Failed to create directory:', err)
  process.exit(1)
}

const files = ['private-key.pem', 'public-key.pem']

files.forEach((file) => {
  const srcPath = path.join(srcKeysDir, file)
  const distPath = path.join(distKeysDir, file)

  try {
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, distPath)
      console.log(`Copied ${file} to dist/`)
    } else {
      console.warn(`Warning: ${file} not found in ${srcKeysDir}`)
    }
  } catch (error) {
    console.error(`Error copying ${file}:`, error)
  }
})
