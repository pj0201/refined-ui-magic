
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// componentTaggerを削除（ビルドエラーの原因となる可能性があるため）
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
    outDir: 'dist', // WordPressのディレクトリを一時的に変更
    emptyOutDir: true,
    assetsDir: '',
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `chunks/[name].[hash].js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.css') {
            return 'style.css';
          }
          return `assets/[name].[ext]`;
        }
      }
    }
  }
});
