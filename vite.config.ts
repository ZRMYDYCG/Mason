import { ConfigEnv, UserConfig, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const viteEnv = loadEnv(mode, process.cwd())
  return {
    base: '/',
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT ? parseInt(viteEnv.VITE_PORT, 10) : 3000,
      proxy: viteEnv.VITE_PROXY
        ? {
            '/api': {
              target: viteEnv.VITE_PROXY,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
            }
          }
        : {}
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag === 'iconpark-icon'
          }
        }
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        dts: 'src/typings/auto-imports.d.ts'
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: 'src/typings/components.d.ts'
      }),
      visualizer({ open: true })
    ],
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    build: {
      outDir: 'dist',
      minify: 'esbuild',
      sourcemap: false,
      reportCompressedSize: false, // 禁用 gzip 压缩大小报告以减少打包时间
      chunkSizeWarningLimit: 1000, // 调整触发警告的 chunk 大小
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
            return 'src' // 将src目录下的代码打包成一个chunk
          }
        }
      }
    }
  }
})
