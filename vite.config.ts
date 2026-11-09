import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'figma:asset/5879bf3215834319cdadf80da5a00755d2ab9eb0.png': path.resolve(__dirname, './src/assets/5879bf3215834319cdadf80da5a00755d2ab9eb0.png'),
      'figma:asset/10be68f43185b69174f9ad5cc031832d9e118087.png': path.resolve(__dirname, './src/assets/10be68f43185b69174f9ad5cc031832d9e118087.png'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
});
