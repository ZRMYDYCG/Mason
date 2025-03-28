import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    // 启用类似 jest 的全局 API
    globals: true,
    // 使用 happy-dom 模拟 DOM
    environment: 'happy-dom',
    // 包含的测试文件
    include: ['src/**/*.{test,spec}.{js,ts,tsx}'],
    // 排除的文件
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    // 覆盖率配置
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './tests/coverage',
      include: ['src/**'],
      exclude: ['src/main.ts', 'src/**/*.stories.ts', 'src/**/*.d.ts', 'src/**/index.ts']
    }
  }
})
