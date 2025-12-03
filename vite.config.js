import * as path from 'path'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import vuePlugin from "@vitejs/plugin-vue";
export default ({
 command,
 mode
}) => {
  const NODE_ENV = mode || 'development'
  const envFiles = [
    `.env.${NODE_ENV}`
  ]
  for (const file of envFiles) {
    // 检查文件是否存在，如果不存在则跳过（适用于CI/CD环境）
    if (fs.existsSync(file)) {
      try {
        const envConfig = dotenv.parse(fs.readFileSync(file))
        for (const k in envConfig) {
          process.env[k] = envConfig[k]
        }
      } catch (error) {
        console.warn(`Warning: Failed to parse ${file}:`, error.message)
      }
    }
  }

  const optimizeDeps = {}

  const alias = {
    '@': path.resolve(__dirname, './src'),
    'vue$': 'vue/dist/vue.runtime.esm-bundler.js',
  }

  const esbuild = {}

  const rollupOptions = {
    output: {
      entryFileNames: 'assets/[name].[hash].js',
      chunkFileNames: 'assets/[name].[hash].js',
      assetFileNames: 'assets/[name].[hash].[ext]',
      manualChunks: {
        // 将Vue相关库分离
        'vue-vendor': ['vue', 'vue-router', 'pinia'],
        // 将Element Plus分离
        'element-plus': ['element-plus'],
        // 将工具库分离
        'utils': ['axios']
      }
    },
  }

  const config = {
    base: '/', // index.html文件所在位置
    root: './', // js导入的资源路径，src
    publicDir: 'public', // 静态资源文件夹
    resolve: {
      alias,
    },
    define: {
      'process.env': {}
    },
    server: {
      // 如果使用docker-compose开发模式，设置为false
      open: true,
      host: '127.0.0.1', // 强制使用 IPv4，避免 IPv6 权限问题
      port: process.env.VITE_CLI_PORT,
      proxy: {
        // 把key的路径代理到target位置
        // detail: https://cli.vuejs.org/config/#devserver-proxy
        [process.env.VITE_BASE_API]: { // 需要代理的路径   例如 '/api'
          target: `${process.env.VITE_BASE_PATH}:${process.env.VITE_SERVER_PORT}/`, // 代理到 目标路径
          changeOrigin: true,
          // 移除 rewrite，保留 /api 前缀转发给后端(或Nginx)
          // rewrite: path => path.replace(new RegExp('^' + process.env.VITE_BASE_API), ''),
        }
      },
    },
    build: {
      minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
      manifest: false, // 是否产出manifest.json
      sourcemap: false, // 是否产出sourcemap.json
      outDir: 'dist', // 产出目录
      rollupOptions,
    },
    esbuild,
    optimizeDeps,
    plugins: [vuePlugin()],
  }

  return config
}
