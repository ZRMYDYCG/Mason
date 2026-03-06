#!/usr/bin/env node

const userAgent = process.env.npm_config_user_agent || ''

if (!userAgent.startsWith('pnpm/')) {
  console.error('Error: This project can only use pnpm as a package manager.')
  console.error('')
  console.error('💡 Please use pnpm to install dependencies:')
  console.error('   pnpm install')
  console.error('')
  console.error('Learn more about pnpm: https://pnpm.io')
  process.exit(1)
}
