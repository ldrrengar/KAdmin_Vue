import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: 'localhost',
    port: 8024,
    open: true,
    // hmr: {
    //   overlay: false
    // }
  },
  resolve: {
    alias: {
       // 如果报错__dirname找不到，需要安装node,执行yarn add @types/node --save-dev
      '@': path.resolve(__dirname, "src")
    }
  },
  css: {
    preprocessorOptions: {
      // 导入scss预编译程序
      scss: {
        // 两种方法都行
        additionalData: '@import "src/styles/index.scss";'
        // additionalData: `@use "src/styles/index.scss";`
      }
    }
  },
  define:{
   "process.env":{}
  }
})
