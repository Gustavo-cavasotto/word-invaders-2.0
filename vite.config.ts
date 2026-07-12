/// <reference types="vitest" />

import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    legacy(),
    // HTTPS self-signed: WebXR exige contexto seguro para testar AR
    // no celular via rede local (aceite o aviso de certificado uma vez)
    basicSsl()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // @iwer/devui e @iwer/sem (emulador WebXR) carregam um three 0.165
    // aninhado; sem dedupe o renderer deles quebra com materiais do
    // three do projeto (material.onBuild) e a sessão AR emulada crasha
    dedupe: ['three'],
  },
  server: {
    host: true, // Permite acesso externo
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
