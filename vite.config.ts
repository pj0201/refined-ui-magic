
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: './',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'wordpress/assets/dist', // WordPressテーマのアセットディレクトリに出力
    emptyOutDir: true,
    assetsDir: '',
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: `index.js`,  // index.jsとして出力
        chunkFileNames: `chunks/[name].[hash].js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.css') {
            return 'style.css';  // style.cssとして出力
          }
          return `assets/[name].[ext]`;
        }
      }
    }
  }
});
