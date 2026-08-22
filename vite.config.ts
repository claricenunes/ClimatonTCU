import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serve este projeto em /ClimatonTCU/ (repo project site), não na raiz do
  // domínio — só aplica esse base no build de produção pra não bagunçar o dev server local.
  base: command === 'build' ? '/ClimatonTCU/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
  },
}))
