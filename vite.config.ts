
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { ConfigEnv, UserConfig } from 'vite';
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => ({
  base: './',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'wordpress/assets/dist',
    emptyOutDir: true,
    assetsDir: '',
    // ハッシュを含めない - 更新時の問題を回避
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: `index.js`,
        chunkFileNames: `chunks/[name].js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.css') {
            return 'style.css';
          }
          return `assets/[name].[ext]`;
        }
      }
    },
    // minifyの設定を緩和 - 不要なエラーの回避
    minify: mode === 'production' ? 'esbuild' : false,
    sourcemap: true,
  }
}));
