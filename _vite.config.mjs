import path, { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ruby from 'vite-plugin-ruby'
import components from 'unplugin-vue-components/vite'
import legacy from '@vitejs/plugin-legacy'
import { toSass } from 'sass-cast'
import { Liquid, Tag as LiquidTag } from 'liquidjs'
import { visualizer } from 'rollup-plugin-visualizer';

const exposedData = ['config', 'data', 'categories'];
const jekyllData = Object.fromEntries(exposedData.map((key) => [key, JSON.parse(process.env[`site_${key}`] || '{}')]));
jekyllData.config.hasOwnProperty('suffix') || (jekyllData.config.suffix = null);

export default defineConfig(({mode})=>({
  build: {
    emptyOutDir: true,
    sourcemap: mode === 'production' ? false : true,
    minify: mode === 'production',
  },
  plugins: [
    (()=>{
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
            return Object.entries(jekyllData[key]).map(([key, value]) => `export const ${key.replace("-", "_")} = ${JSON.stringify(value)};`).join('\n');
          }
        },
      };
    })(),
    (()=>{
      const helpPages = jekyllData.categories.help || [];
      return {
        name: 'tuna-help-pages',
        resolveId(id) {
          if (id === "virtual:tuna-help-pages") {
            return '\0' + id;
          }
        },
        load(id) {
          if (id === '\0' + "virtual:tuna-help-pages") {
            const pages = Object.fromEntries(helpPages.map((page) => [
              page.mirrorid,
              page.url,
            ]));
            return `export default ${JSON.stringify(pages)};`;
          }
        },
      };
    })(),
    vue({
      template: {
        preprocessCustomRequire(id){
          if(id === "liquid"){
            return {
              render(source, options, cb){
                const engine = new Liquid({
                  root: jekyllData.config.source,
                  partials: path.join(jekyllData.config.source, jekyllData.config.includes_dir),
                  globals: jekyllData,
                  jekyllInclude: true,
                });
                engine.registerTag("fa_svg", class extends LiquidTag{
                  constructor(token, remainTokens, liquid){
                    super(token, remainTokens, liquid);
                    this.value = token.args;
                  }
                  * render (ctx, emitter){
                    emitter.write(`<svg class="icon"><use xlink:href="#${this.value}"></use></svg>`);
                  }
                });
                try{
                  const result = engine.parseAndRenderSync(source, {...options});
                  cb(null, result);
                }catch(e){
                  cb(e);
                }
              }
            }
          }
        },
      },

    }),
    ruby(),
    components({
      dirs: [resolve(__dirname, '_src/components')],
      resolvers:[
      ],
    }),
    legacy({
      targets: [],
    }),
    visualizer(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        functions: {
          "jekyll-config()": function(){
            return toSass(jekyllData.config);
          }
        }
      },
    },
  }
}))
