import path, { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ruby from "vite-plugin-ruby";
import components from "unplugin-vue-components/vite";
import legacy from "@vitejs/plugin-legacy";
import { toSass } from "sass-cast";
import { Liquid, Tag as LiquidTag } from "liquidjs";
import Babel from "@babel/core";
import BabelPresetEnv from "@babel/preset-env";
import fs from "node:fs";
import { build as viteBuild, normalizePath } from "vite";
import glob from "fast-glob";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import Typescript from "typescript";
import { fileURLToPath } from "node:url";

const visualizer = await (async () => {
  if (process.env.VISUALIZER) {
    return (await import("rollup-plugin-visualizer")).visualizer;
  } else {
    return () => null;
  }
})();

const exposedData = ["config", "data", "categories"];
const jekyllData = Object.fromEntries(
  exposedData.map((key) => [
    key,
    ((fd) => {
      if (fd) {
        const fdNum = parseInt(fd);
        if (!isNaN(fdNum)) {
          const buf = Buffer.alloc(fs.fstatSync(fdNum).size);
          fs.readSync(fdNum, buf);
          return JSON.parse(buf.toString());
        } else {
          return {};
        }
      } else {
        return {};
      }
    })(process.env[`site_${key}`]),
  ]),
);
jekyllData.config.hasOwnProperty("suffix") || (jekyllData.config.suffix = null);

const tsConfig = (() => {
  const tsconfigPath = path.join("_src", "tsconfig.json");
  return {
    tsconfig: tsconfigPath,
    filterRoot: false,
    typescript: {
      ...Typescript,
      readConfigFile(filename, readFile) {
        const result = Typescript.readConfigFile(filename, readFile);
        if (result.error) {
          return result;
        }
        result.config.files ??= [];
        result.config.files = result.config.files.map((file) => {
          const tsconfigDir = resolve(__dirname, path.dirname(tsconfigPath));
          const resolvedFile = resolve(tsconfigDir, file);
          const nodeModuleDir = resolve(__dirname, "node_modules");
          const jekyllCacheDir = resolve(__dirname, ".jekyll-cache");

          const relativeNodeModule = path.relative(nodeModuleDir, resolvedFile);
          if (!relativeNodeModule.startsWith("../")) {
            return fileURLToPath(import.meta.resolve(relativeNodeModule));
          }
          const relativeJekyllCache = path.relative(
            jekyllCacheDir,
            resolvedFile,
          );
          if (!relativeJekyllCache.startsWith("../")) {
            return resolve(jekyllData.config.cache_dir, relativeJekyllCache);
          }
          return resolvedFile;
        });
        return result;
      },
    },
  };
})();

export default defineConfig(({ mode }) => ({
  build: {
    emptyOutDir: true,
    sourcemap: mode === "production" ? false : true,
    minify: mode === "production",
  },
  plugins: [
    (() => {
      const importNamePrefix = "virtual:jekyll-";
      const loadNamePrefix = "\0" + importNamePrefix;

      return {
        name: "jekyll",
        resolveId(id) {
          if (id.startsWith(importNamePrefix)) {
            return loadNamePrefix + id.slice(importNamePrefix.length);
          }
        },
        load(id) {
          if (id.startsWith(loadNamePrefix)) {
            const key = id.slice(loadNamePrefix.length);
            return Object.entries(jekyllData[key])
              .map(
                ([key, value]) =>
                  `export const ${key.replace("-", "_")} = ${JSON.stringify(value)};`,
              )
              .join("\n");
          }
        },
      };
    })(),
    (() => {
      const helpPages = jekyllData.categories.help || [];
      return {
        name: "tuna-help-pages",
        resolveId(id) {
          if (id === "virtual:tuna-help-pages") {
            return "\0" + id;
          }
        },
        load(id) {
          if (id === "\0" + "virtual:tuna-help-pages") {
            const pages = Object.fromEntries(
              helpPages.map((page) => [page.mirrorid, page.url]),
            );
            return `export default ${JSON.stringify(pages)};`;
          }
        },
      };
    })(),
    typescript(tsConfig),
    vue({
      template: {
        preprocessCustomRequire(id) {
          if (id === "liquid") {
            return {
              render(source, options, cb) {
                const engine = new Liquid({
                  root: jekyllData.config.source,
                  partials: path.join(
                    jekyllData.config.source,
                    jekyllData.config.includes_dir,
                  ),
                  globals: jekyllData,
                  jekyllInclude: true,
                });
                engine.registerTag(
                  "fa_svg",
                  class extends LiquidTag {
                    constructor(token, remainTokens, liquid) {
                      super(token, remainTokens, liquid);
                      this.value = token.args;
                    }
                    *render(ctx, emitter) {
                      emitter.write(
                        `<svg class="icon"><use xlink:href="#${this.value}"></use></svg>`,
                      );
                    }
                  },
                );
                try {
                  const result = engine.parseAndRenderSync(source, {
                    ...options,
                  });
                  cb(null, result);
                } catch (e) {
                  cb(e);
                }
              },
            };
          }
        },
      },
    }),
    ruby(),
    components({
      dirs: [resolve(__dirname, "_src/components")],
      resolvers: [],
      dts: resolve(jekyllData.config.cache_dir, "vite-components.d.ts"),
    }),
    (() => {
      const savedConfig = {
        njsOutputDir: "static/njs",
      };
      return {
        name: "add-njs",
        config(config) {
          savedConfig.minify = config.build?.minify ? "terser" : false;
          savedConfig.root = config.root;
          savedConfig.mode = config.mode;
          savedConfig.njsFiles = glob.sync("entrypoints-njs/**", {
            cwd: config.root,
          });
          savedConfig.sourcemap = config.build?.sourcemap;
          savedConfig.logLevel = config.logLevel;
        },
        async generateBundle(opts, bundle) {
          const { minify, root, mode, njsOutputDir, njsFiles, logLevel } =
            savedConfig;
          if (opts.format === "system") {
            const entryChunk = Object.values(bundle).find(
              (output) => output.type === "chunk" && output.isEntry,
            );
            if (!!entryChunk && entryChunk.fileName.includes("-legacy")) {
              return;
            }
          }
          if (njsFiles.length == 0) {
            return;
          }
          const res = await viteBuild({
            mode,
            root,
            configFile: false,
            logLevel,
            plugins: [
              typescript(tsConfig),
              getBabelOutputPlugin({
                presets: ["babel-preset-njs"],
                plugins: ["./_src/babel-njs/index.mjs"],
                configFile: false,
              }),
            ],
            build: {
              write: false,
              minify,
              assetsDir: njsOutputDir,
              sourcemap: savedConfig.sourcemap,
              rollupOptions: {
                input: Object.fromEntries(
                  njsFiles.map((filename) => [
                    filename,
                    path.join(root, filename),
                  ]),
                ),
                output: {
                  format: "esm",
                  entryFileNames: ({ name }) => {
                    const shortName = path.basename(name).split(".")[0];
                    return path.join(njsOutputDir, `${shortName}.njs`);
                  },
                  chunkFileNames: `${njsOutputDir}/[name].njs`,
                },
                preserveEntrySignatures: "strict",
              },
            },
            esbuild: false,
          });
          const outputs = Array.isArray(res) ? res : [res];
          outputs.forEach((output) => {
            output.output.forEach((chunk) => {
              bundle[chunk.fileName] = chunk;
            });
          });
        },
      };
    })(),
    legacy({
      //use empty array to target the oldest browsers possible
      targets: [],
      additionalLegacyPolyfills: [
        resolve(__dirname, "_src/lib/legacy-polyfill.js"),
      ],
    }),
    (() => {
      const savedConfig = {};
      const targets = [];
      return {
        name: "babel-transform-legacy-polyfill",
        config(config, env) {
          savedConfig.minify = !!config.build?.minify;
        },
        generateBundle(opts, bundle) {
          const legacyPolyfill = (() => {
            for (const key in bundle) {
              if (
                key.includes("legacy") &&
                bundle[key].facadeModuleId === "\0" + "vite/legacy-polyfills"
              ) {
                return bundle[key];
              }
            }
            return null;
          })();
          if (!legacyPolyfill) {
            return;
          }
          const result = Babel.transform(legacyPolyfill.code, {
            babelrc: false,
            configFile: false,
            compact: savedConfig.minify,
            sourceMaps: false,
            inputSourceMap: undefined,
            presets: [
              [
                BabelPresetEnv,
                {
                  targets: targets,
                  bugfixes: true,
                  loose: false,
                  modules: false,
                  useBuiltIns: false,
                  corejs: undefined,
                  shippedProposals: true,
                  ignoreBrowserslistConfig: true,
                  exclude: ["@babel/plugin-transform-typeof-symbol"],
                },
              ],
            ],
          });
          legacyPolyfill.code = result.code;
        },
      };
    })(),
    visualizer({
      filename: "_stats.html",
      gzipSize: true,
      sourcemap: mode === "development",
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        functions: {
          "jekyll-config()": function () {
            return toSass(jekyllData.config);
          },
        },
      },
    },
  },
}));
