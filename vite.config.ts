/// <reference types="vitest" />

import basicSsl from '@vitejs/plugin-basic-ssl'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    // HTTPS self-signed: WebXR exige contexto seguro para testar AR
    // no celular via rede local (aceite o aviso de certificado uma vez)
    basicSsl()
  ],
  server: {
    host: true, // Permite acesso externo
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
