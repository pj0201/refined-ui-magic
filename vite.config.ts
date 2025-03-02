
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { ConfigEnv, UserConfig } from 'vite';

export default defineConfig(({ mode }: ConfigEnv): UserConfig => ({
  base: './',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // componentTaggerプラグインは開発モードでのみ使用
    mode === 'development' && {
      name: 'lovable-tagger',
      apply: 'serve',
      // 必要最小限の設定でダミー実装
      enforce: 'post' as const
    }
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
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: `index.js`,
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
}));
