import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// Every form posts to Web3Forms (src/components/forms/Web3Form.tsx). Without the
// key the forms can't be sent, so a production build must not ship without it.
const WEB3FORMS_KEY = 'VITE_PUBLIC_WEB3FORMS_ACCESS_KEY';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'build' && !loadEnv(mode, process.cwd(), 'VITE_')[WEB3FORMS_KEY]) {
    throw new Error(
      `${WEB3FORMS_KEY} is not set. Set it as a build variable (or in .env) so the site's forms can be sent.`,
    );
  }
  return {
    plugins: [
      devtools({ eventBusConfig: { enabled: false } }),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      tailwindcss(),
      react(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
