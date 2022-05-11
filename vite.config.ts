import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import styleImport from 'vite-plugin-style-import';
import ReactRouterGenerator from "vite-plugin-react-router-generator"

function AntdLibImport() {
  return {
    libraryName: "antd",
    esModule: true,
    resolveStyle: (name) => {
      return `antd/es/${name}/style/index`;
    },
  }
}
// https://vitejs.dev/config/
export default defineConfig({
  define: {
  },
  plugins: [
    ReactRouterGenerator({
      outputFile: "./src/router/auto.js",
      isLazy: false
    }),
    react(),
    styleImport({ libs: [AntdLibImport()] })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    }
  },
  server: {
    port: 3000,
    open: true,
  },
})
