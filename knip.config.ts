import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  entry: ['src/main.ts'],
  project: ['tsconfig.json'],
  ignore: ['**/node_modules/**', '**/dist/**', '**/coverage/**', '**/.turbo/**', '**/out/**'],
}

export default config
