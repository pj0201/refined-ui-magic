import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { ConfigEnv, UserConfig } from 'vite';
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => ({
  base: './', // 相対パスを使用
  server: {
    host: "::",
    port: 8080,
    historyApiFallback: true,
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
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    copyPublicDir: true, // 静的ファイルをコピー
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (!assetInfo || !assetInfo.name) {
            return 'assets/unknown-[hash].[ext]';
          }
          
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (ext === 'css') {
            return 'css/[name]-[hash].[ext]'; // CSSファイルの出力パス
          }
          
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
            return 'images/[name]-[hash].[ext]'; // 画像ファイルの出力パス
          }
          
          return 'assets/[name]-[hash].[ext]'; // その他のアセット
        }
      }
    },
    minify: mode === 'production', // プロダクションでのみ最小化
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  }
}));
