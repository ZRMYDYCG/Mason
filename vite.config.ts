import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import path from 'node:path'
import { viteMockServe } from 'vite-plugin-mock'
import { compression } from 'vite-plugin-compression2'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import legacy from '@vitejs/plugin-legacy'
import { visualizer } from 'rollup-plugin-visualizer'
import { CodeInspectorPlugin } from 'code-inspector-plugin'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  console.log(env)

  // 如果有其他环境场景 可以修改此处 当前只针对生产环境
  const isProd = mode === 'prod'

  return {
    // 预构建配置
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
    },
    // 构建配置
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      assetsInlineLimit: 4096,
      reportCompressedSize: true,
      cssCodeSplit: true,
      minify: 'terser',
      sourcemap: !isProd,
      terserOptions: isProd
        ? {
            // 代码压缩配置
            compress: {
              // 移除 console.log
              drop_console: true,
              // 移除 debugger
              drop_debugger: true,
            },
            // 代码混淆配置
            mangle: {
              // 混淆顶层变量名
              toplevel: true,
              // 混淆 eval 中的变量
              eval: true,
            },
            // 输出配置
            format: {
              comments: false,
            },
          }
        : {},
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
          },
        },
      },
    },
    plugins: [
      VueRouter({}),
      // ⚠️ Vue must be placed after VueRouter()
      vue(),
      vueJsx(),
      vueDevTools(),
      UnoCSS(),
      createSvgIconsPlugin({
        iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
        symbolId: 'icon-[dir]-[name]',
      }),
      Layouts({
        layoutsDirs: 'src/layouts',
        defaultLayout: 'default',
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        // 如果有其他要自动导入的库，只需要在imports数组中追加该库就行。
        imports: ['vue', VueRouterAutoImports, 'pinia', '@vueuse/core'],
      }),
      Components({
        deep: true,
        directoryAsNamespace: false,
      }),
      vueI18n({
        // 语言包目录
        include: path.resolve(__dirname, './src/i18n/locales/**'),
        // 开发模式下也启动编译时处理
        runtimeOnly: false,
        // 仅使用组合式 API
        compositionOnly: true,
        // 完整安装
        fullInstall: true,
      }),
      viteMockServe({
        mockPath: './mock',
        enable: true,
      }),
      compression({
        algorithms: ['gzip'],
        threshold: 10240, // 压缩阈值，超过 10kb 才压缩
        deleteOriginalAssets: false, // 不删除原始文件
      }),
      ViteImageOptimizer({
        png: {
          quality: 80,
        },
        jpeg: {
          quality: 80,
        },
        webp: {
          quality: 80,
        },
      }),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      visualizer({
        filename: 'stats.html',
      }),
      CodeInspectorPlugin({
        bundler: 'vite',
        // 列表： https://github.com/zh-lx/launch-ide
        // VSCode: code; Trae: trae; WebStorm: webstorm; Cursor: cursor; Widsurf: widsurf
        editor: 'code',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
