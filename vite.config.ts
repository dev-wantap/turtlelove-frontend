import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // 프로덕션 빌드에서만 번들 분석 생성
    mode === 'production' && visualizer({
      filename: './dist/stats.html',
      open: false, // 자동 열기 비활성화 (CI/CD 환경 고려)
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    // 프로덕션 최적화
    target: 'es2020',
    minify: 'esbuild', // 빠른 minification
    cssMinify: true,

    // 성능 경고 임계값
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // 기존 vendor 분리 유지 + 최적화
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-stomp': ['@stomp/stompjs'],
          'vendor-form': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-toast', '@radix-ui/react-slot'],
        },

        // 파일명 패턴 (캐시 최적화)
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },

    // 소스맵 설정 (프로덕션에서는 비활성화)
    sourcemap: mode === 'development',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    fakeTimers: {
      toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'setImmediate', 'clearImmediate', 'Date'],
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/dist/**',
        '**/mock/**', // Mock 데이터 제외
      ],
    },
  },
}))
