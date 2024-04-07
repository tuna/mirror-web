import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ruby from 'vite-plugin-ruby'
import components from 'unplugin-vue-components/vite'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig(({mode})=>({
  build: {
    emptyOutDir: true,
    sourcemap: mode === 'production' ? false : true,
    minify: mode === 'production',
  },
  plugins: [
    (()=>{
      const exposedData = ['config', 'data', 'categories'];
      const jekyllData = Object.fromEntries(exposedData.map((key) => [key, JSON.parse(process.env[`site_${key}`] || '{}')]));
      const importNamePrefix = 'virtual:jekyll-';
      const loadNamePrefix = '\0' + importNamePrefix;

      return {
        name: 'jekyll',
        resolveId(id) {
          if (id.startsWith(importNamePrefix)) {
            return loadNamePrefix + id.slice(importNamePrefix.length);
          }
        },
        load(id) {
          if (id.startsWith(loadNamePrefix)) {
            const key = id.slice(loadNamePrefix.length);
            return Object.entries(jekyllData[key]).map(([key, value]) => `export const ${key} = ${JSON.stringify(value)};`).join('\n');
          }
        },
      };
    })(),
    vue(),
    ruby(),
    components({
      dirs: [resolve(__dirname, '_src/components')],
      resolvers:[
      ],
    }),
    legacy({
      targets: [],
    }),
  ],
}))
