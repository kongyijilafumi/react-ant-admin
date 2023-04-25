import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ReactRouterGenerator from "vite-plugin-react-router-generator"
import { resolve } from "path"
import { theme } from 'antd';
import lessToJs from 'less-vars-to-js';
import { readFileSync } from 'fs'

const { defaultAlgorithm, defaultSeed } = theme;
const varLessPath = "./theme/var.less"
const mapToken = defaultAlgorithm(defaultSeed);
const varLessStr = readFileSync(varLessPath, 'utf-8')
const customVarLessJson = lessToJs(varLessStr, { resolveVariables: true, stripPrefix: true });

// https://vitejs.dev/config/
export default defineConfig({
  base: "/react-ant-admin",
  build: {
    outDir: "react-ant-admin"
  },
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
    MENU_PARENTPATH: `"parentPath"`,
    MENU_LAYOUT: `'layout'`,
    __IS_THEME__: `${process.env.REACT_APP_COLOR === "1"}`,
    CUSTOMVARLESSDATA: `${JSON.stringify(customVarLessJson)}`
  },
  plugins: [
    ReactRouterGenerator({
      outputFile: resolve(".", "./src/router/auto.jsx"),
      isLazy: true,
      comKey: "components"
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": resolve(".", "./src"),
      "~": resolve(".", "./node_modules")
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', ".less"]
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: { ...mapToken, ...customVarLessJson },
      },
    }
  },
  server: {
    port: 3000,
    open: false,
    host: true,
    proxy: {
      '^/api': {
        target: "https://z3web.cn",
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace("/api", "/api/react-ant-admin")
        }
      },
    },
  },
  envPrefix: "REACT_APP_",
})
