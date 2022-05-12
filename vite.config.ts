import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import styleImport from 'vite-plugin-style-import';
import ReactRouterGenerator from "vite-plugin-react-router-generator"
import { resolve } from "path"
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
  base: "/react-ant-admin",
  define: {
    MENU_PATH: `"path"`,
    MENU_SHOW: `"isShowOnMenu"`,
    MENU_KEEPALIVE: `"keepAlive"`,
    MENU_KEY: `"key"`,
    MENU_ICON: `"icon"`,
    MENU_TITLE: `"title"`,
    MENU_CHILDREN: `"children"`,
    MENU_PARENTKEY: `"parentKey"`,
    MENU_ALLPATH: `"allPath"`,
    MENU_PARENTPATH: `"parentPath"`
  },
  plugins: [
    ReactRouterGenerator({
      outputFile: resolve(".", "./src/router/auto.jsx"),
      isLazy: false,
      comKey: "components"
    }),
    react(),
    styleImport({ libs: [AntdLibImport()] })
  ],
  resolve: {
    alias: {
      "@": resolve(".", "./src")
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', ".less"]
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        charset: false,
        additionalData: `@import "${resolve(".", "./src/assets/theme/var.less")}";`,
      },
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true,
    proxy: {
      '^/api': {
        target: "https://azhengpersonalblog.top",
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace("/api", "/api/react-ant-admin")
        }
      },
    },
  },
  envPrefix: "REACT_APP_",
  envDir: "./env"
})
