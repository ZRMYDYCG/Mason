import { ConfigEnv, UserConfig, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteCompression from 'vite-plugin-compression'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import inspect from 'vite-plugin-inspect'
import tailwindcss from '@tailwindcss/vite'
import viteImagemin from 'vite-plugin-imagemin'
import { viteBuildInfo } from './src/build/info'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const viteEnv = loadEnv(mode, process.cwd())
  const isProduction = mode === 'production'
  const isBuild = command === 'build'

  return {
    base: viteEnv.VITE_BASE_URL || '/',
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js' // 避免i18n警告
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'] // 导入时省略的扩展名列表
    },
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT ? parseInt(viteEnv.VITE_PORT, 10) : 3000,
      proxy: viteEnv.VITE_PROXY
        ? {
            '/api': {
              target: viteEnv.VITE_PROXY,
              changeOrigin: true,
              rewrite: (path) => {
                console.log('path', path)
                return path.replace(/^\/api/, '')
              },
              ...(viteEnv.VITE_PROXY_COOKIE_PATH
                ? { cookiePathRewrite: viteEnv.VITE_PROXY_COOKIE_PATH }
                : {})
            },
            '/file': {
              target: viteEnv.VITE_FILE_PROXY,
              changeOrigin: true,
              rewrite: (path) => {
                console.log('走代理')
                return path.replace(/^\/file/, '')
              }
            }
          }
        : {},
      open: true, // 开发服务器启动时自动打开浏览器
      cors: true, // 默认启用并允许任何源
      strictPort: true, // 端口被占用直接退出
      hmr: {
        overlay: false // 禁用热更新错误覆盖层
      }
    },
    preview: {
      port: 4173
    },
    css: {
      devSourcemap: !isProduction, // 开发环境下启用 sourcemap
      postcss: {
        plugins: []
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/var.scss" as *;` // 全局scss变量
        }
      }
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag === 'iconpark-icon'
          }
        },
        script: {
          defineModel: true // 启用实验性 defineModel
        }
      }),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            axios: [['default', 'axios']]
          }
        ],
        resolvers: [ElementPlusResolver()],
        dts: 'src/typings/auto-imports.d.ts',
        eslintrc: {
          enabled: true // 生成eslint配置
        }
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass' // 使用sass样式
          })
        ],
        dts: 'src/typings/components.d.ts',
        dirs: ['src/components'], // 自动导入的目录
        deep: true, // 深度扫描子目录
        types: [] // 自定义组件类型
      }),
      // HTML相关插件
      createHtmlPlugin({
        minify: isProduction,
        inject: {
          data: {
            title: viteEnv.VITE_APP_TITLE || 'Vite App',
            injectScript: viteEnv.VITE_INJECT_SCRIPT || ''
          }
        }
      }),
      // 构建分析
      visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true
      }),
      // Gzip/Brotli压缩
      viteCompression({
        verbose: true,
        disable: !isProduction,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      // CommonJS转换（兼容旧包）
      viteCommonjs(),
      // 检查插件中间状态
      inspect(),
      tailwindcss(),
      viteImagemin({
        gifsicle: { optimizationLevel: 7 },
        optipng: { optimizationLevel: 7 },
        webp: { quality: 75 }
      }),
      viteBuildInfo()
    ],
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', 'element-plus', 'axios'],
      exclude: ['vue-demi'],
      esbuildOptions: {
        target: 'es2020',
        supported: {
          bigint: true
        }
      }
    },
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
      drop: isProduction ? ['console', 'debugger'] : [],
      target: 'es2020',
      legalComments: 'none' // 移除法律注释
    },
    build: {
      outDir: 'dist',
      minify: isProduction ? 'esbuild' : false,
      sourcemap: viteEnv.VITE_SOURCEMAP === 'true',
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1500,
      cssCodeSplit: true, // CSS代码分割
      assetsInlineLimit: 4096, // 小于4kb的asset转为base64
      emptyOutDir: true, // 构建前清空outDir
      target: 'es2020',
      modulePreload: {
        polyfill: false // 现代浏览器不需要polyfill
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          compact: true,
          generatedCode: {
            reservedNamesAsProps: false
          },
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              const moduleName = id.toString().split('node_modules/')[1].split('/')[0]
              // 将大依赖单独打包
              if (['element-plus', 'vue', 'vue-router', 'pinia'].includes(moduleName)) {
                return `vendor-${moduleName}`
              }
              return 'vendor'
            }
            if (id.includes('src/views') || id.includes('src/pages')) {
              return 'views'
            }
            return 'src'
          }
        },
        treeshake: {
          preset: 'recommended',
          moduleSideEffects: true,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false
        },
        plugins: [
          // rollup专用插件
        ]
      },
      commonjsOptions: {
        transformMixedEsModules: true,
        exclude: ['node_modules/lodash-es/**']
      }
    }
  }
})
