/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import compressPlugin from 'vite-plugin-compression';

const { resolve } = path;
const dirname = resolve();

export default defineConfig({
  server: {
    port: 3000,
    fs: {
      allow: ['..'],
    },
  },
  envPrefix: 'REACT_APP_',
  plugins: [
    react(),
    compressPlugin({
      ext: '.br',
      algorithm: 'brotliCompress',
      deleteOriginFile: false,
      threshold: 50,
    }),
    compressPlugin({
      ext: '.gz',
      deleteOriginFile: false,
      threshold: 50,
    }),
  ],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  resolve: {
    alias: {
      '@': resolve(dirname, './src'),
    },
  },
  preview: {
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 1000,
    outDir: 'build',
  },
  base: './',
});
