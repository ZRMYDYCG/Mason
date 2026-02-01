const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

// Fix path: go up one level from scripts to find src
const keysDir = path.join(__dirname, '..', 'src', 'config', 'keys')
const privateKeyPath = path.join(keysDir, 'private-key.pem')
const publicKeyPath = path.join(keysDir, 'public-key.pem')

if (!fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir, { recursive: true })
  console.log('Created directory:', keysDir)
}

// Check if keys already exist to prevent accidental overwrite during postinstall
if (fs.existsSync(privateKeyPath) && fs.existsSync(publicKeyPath)) {
  console.log('✅ Keys already exist. Skipping generation.')
  process.exit(0)
}

console.log('Generating new RSA keys...')

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
})

fs.writeFileSync(privateKeyPath, privateKey)
console.log('✅ Generated private-key.pem')

fs.writeFileSync(publicKeyPath, publicKey)
console.log('✅ Generated public-key.pem')
