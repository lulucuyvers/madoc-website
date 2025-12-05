import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { markdownPlugin } from './vite-plugin-markdown';
import { copyFileSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  plugins: [
    react(), 
    markdownPlugin(),
    {
      name: 'copy-public-admin',
      closeBundle() {
        // Force copy admin files after build
        const adminSrc = join(process.cwd(), 'public', 'admin');
        const adminDest = join(process.cwd(), 'dist', 'admin');
        
        try {
          mkdirSync(adminDest, { recursive: true });
          
          // Copy config.yml
          const configPath = join(adminSrc, 'config.yml');
          const configContent = readFileSync(configPath, 'utf-8');
          console.log('📋 Source config.yml first 200 chars:', configContent.substring(0, 200));
          
          copyFileSync(configPath, join(adminDest, 'config.yml'));
          copyFileSync(join(adminSrc, 'index.html'), join(adminDest, 'index.html'));
          
          // Verify copy
          const copiedContent = readFileSync(join(adminDest, 'config.yml'), 'utf-8');
          console.log('✅ Copied config.yml first 200 chars:', copiedContent.substring(0, 200));
          console.log('✅ Admin files copied successfully to:', adminDest);
        } catch (error) {
          console.error('❌ Failed to copy admin files:', error);
        }
      }
    }
  ],
  assetsInclude: ['*/.md'],
  publicDir: 'public',
  build: {
    outDir: 'dist',
  },
});