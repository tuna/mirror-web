import { parseArgs } from "node:util";
import { parse as yamlParse } from "yaml";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { toMarkdown } from "mdast-util-to-markdown";
import * as visitor from "unist-util-visit";
import { tokensToMyst } from "myst-parser";
import mystPlugin from "markdown-it-myst";
import MarkdownIt from "markdown-it";
import { VFile } from "vfile";
import Hogan from "hogan.js";
import { flattenData } from "../_src/lib/helpz-libs.mjs";
import hljs from "highlight.js";
import { renderZForm } from "./templates.jsx";

const options = parseArgs({
  options: {
    "enabled-pages": {
      type: "string",
    },
    language: {
      type: "string",
    },
    "output-dir": {
      type: "string",
      default: "./generated",
    },
    "site-config": {
      type: "string",
      default: "{}",
    },
  },
}).values;

if (!options["enabled-pages"]) {
  console.error("enabled-pages is required");
  process.exit(1);
}

if (!options["language"]) {
  console.error("language is required");
  process.exit(1);
}

const enablePages = yamlParse(
  fs.readFileSync(options["enabled-pages"], "utf-8"),
);
if (!Array.isArray(enablePages)) {
  console.error("enabled-pages should be an array");
  process.exit(1);
}

const outputDir = options["output-dir"];
fs.mkdirSync(outputDir, { recursive: true });
fs.readdirSync(outputDir, { withFileTypes: true }).forEach((file) => {
  if (file.isDirectory()) {
    console.error(
      `output dir ${outputDir} is not empty, please clear it before generating`,
    );
    process.exit(1);
  } else {
    fs.rmSync(`${outputDir}/${file.name}`);
  }
});

const docsDir = path.dirname(fileURLToPath(import.meta.url));
const language = options["language"];

const siteConfig = JSON.parse(options["site-config"]);

const pathsForPage = (page, file) => ({
  local: path.join(docsDir, "local", page, file),
  global: path.join(docsDir, "global", page, file),
});

const loadFile = (page, file, defaultValue) => {
  const { local: localPath, global: globalPath } = pathsForPage(page, file);
  if (fs.existsSync(localPath)) {
    return { path: localPath, content: fs.readFileSync(localPath, "utf-8") };
  } else if (fs.existsSync(globalPath)) {
    return { path: globalPath, content: fs.readFileSync(globalPath, "utf-8") };
  } else if (defaultValue !== undefined) {
    console.warn(`file ${file} not found in page ${page}`);
    return { path: null, content: defaultValue };
  } else {
    console.error(`file ${file} not found in page ${page}`);
    process.exit(1);
  }
};

const loadConf = (page, language) => {
  const { local: localPath, global: globalPath } = pathsForPage(
    page,
    `${language}.yaml`,
  );
  if (!fs.existsSync(localPath) && !fs.existsSync(globalPath)) {
    console.error(`config file ${language}.yaml not found in page ${page}`);
    process.exit(1);
  }
  const localConf = fs.existsSync(localPath)
    ? yamlParse(fs.readFileSync(localPath, "utf-8"))
    : {};
  const globalConf = fs.existsSync(globalPath)
    ? yamlParse(fs.readFileSync(globalPath, "utf-8"))
    : {};
  const inputs = {};
  if (globalConf.input) {
    for (const key in globalConf.input) {
      inputs[key] = globalConf.input[key];
    }
  }
  if (localConf.input) {
    for (const key in localConf.input) {
      inputs[key] = localConf.input[key];
    }
  }
  for (const key in inputs) {
    if (inputs[key] === null) {
      delete inputs[key];
    }
  }
  const config = {};
  for (const key in globalConf) {
    config[key] = globalConf[key];
  }
  for (const key in localConf) {
    config[key] = localConf[key];
  }
  config.input = inputs;
  config.name = page;
  return config;
};

const loadBlock = (page, block, language) => {
  return loadFile(page, `${block}.${language}.md`, "");
};

function defaultInput(inputDesc) {
  if (inputDesc.option) {
    const defaultOption =
      Object.entries(inputDesc.option).find(([, value]) => value?.default) ||
      Object.entries(inputDesc.option)[0];
    const value = {};
    Object.entries(defaultOption[1] || {}).forEach(([key, val]) => {
      if (key !== "default" && key !== "_") {
        value[key] = val;
      }
    });
    return [defaultOption[0], value];
  } else if (
    inputDesc["true"] !== undefined ||
    inputDesc["false"] !== undefined
  ) {
    if (inputDesc.default) {
      return inputDesc["true"] !== undefined && inputDesc["true"] !== null
        ? inputDesc["true"]
        : true;
    } else {
      return inputDesc["false"] !== undefined && inputDesc["false"] !== null
        ? inputDesc["false"]
        : false;
    }
  } else {
    return inputDesc.default || "";
  }
}

function getRenderContext(globalVars, zconf, inputVars) {
  const globalValues = {};
  Object.entries(globalVars).forEach(([key, value]) => {
    globalValues[key] = defaultInput(value);
  });
  const data = flattenData(globalValues);
  data.endpoint = data.urlpath;
  if (inputVars) {
    const localValues = {};
    inputVars.split(" ").forEach((inputName) => {
      const inputDesc = zconf.input[inputName];
      localValues[inputName] = defaultInput(inputDesc);
    });
    Object.entries(flattenData(localValues)).forEach(([key, value]) => {
      data[key] = value;
    });
  }
  return data;
}

function renderTemplate(tmpl, globalVars, zconf, inputVars, lang) {
  const renderContext = getRenderContext(globalVars, zconf, inputVars);
  const compiledTemplate = Hogan.compile(tmpl, { asString: true });
  const renderedConfig = Hogan.compile(tmpl).render(renderContext);
  let highlighted = "";
  if (lang && hljs.getLanguage(lang)) {
    highlighted = hljs.highlight(renderedConfig, { language: lang }).value;
  } else if (!lang) {
    highlighted = hljs.highlightAuto(renderedConfig).value;
  } else {
    highlighted = hljs.escapeHTML(renderedConfig);
  }
  return { compiled: compiledTemplate, rendered: highlighted };
}

function genGlobalVars(site, zconf) {
  const path =
    zconf.git || zconf.name.endsWith(".git") ? `git/${zconf.name}` : zconf.name;
  return {
    scheme: {
      _: "是否使用 HTTPS",
      true: "https",
      false: "http",
    },
    sudo: {
      _: "是否使用 sudo",
      true: "sudo ",
      false: "",
    },
    ipv6: {
      _: "线路选择",
      default: "auto",
      option: {
        auto: {
          _: "自动",
          urlpath: `${site.url || ""}/${path}`,
        },
        ipv4: {
          _: "IPv4",
          urlpath: `${site.urlv4 || ""}/${path}`,
        },
        ipv6: {
          _: "IPv6",
          urlpath: `${site.urlv6 || ""}/${path}`,
        },
      },
    },
  };
}

enablePages.forEach((page) => {
  const conf = loadConf(page, language);
  const mdContent = [];
  const templates = [];
  let templateIndex = 0;
  const globalVars = genGlobalVars(siteConfig, conf);
  mdContent.push(`{% raw %}`);
  mdContent.push(`# ${conf["_"]}\n`);
  let inputCounter = 0;
  mdContent.push(
    renderZForm(-1, Object.keys(globalVars), globalVars, () => inputCounter++) +
      "\n",
  );
  const blocks = conf.block || ["index"];
  blocks.forEach((block) => {
    const { content: blockContent, path: blockPath } = loadBlock(
      page,
      block,
      language,
    );
    const tokenizer = new MarkdownIt("commonmark");
    tokenizer.use(mystPlugin);
    const mdast = tokensToMyst(
      blockContent,
      tokenizer.parse(blockContent, {
        vfile: new VFile({
          path: blockPath,
        }),
      }),
    );

    visitor.visit(
      mdast,
      ["mystRole", "mystDirective", "mystDirectiveError", "mystRoleError"],
      (node, index, parent) => {
        if (
          node.type === "mystDirectiveError" ||
          node.type === "mystRoleError"
        ) {
          console.error(
            `Error parsing directive/role on page ${page}, block ${block}: ${node.message} at line ${node.position.start.line}, column ${node.position.start.column}`,
          );
          process.exit(1);
        }
        if (node.type === "mystDirective" || node.type === "mystRole") {
          if (node.name !== "ztmpl") {
            console.error(
              `Unsupported directive/role ${node.name} on page ${page}, block ${block} at line ${node.position.start.line}, column ${node.position.start.column}`,
            );
            process.exit(1);
          }
        }
        if (node.type === "mystRole") {
          const roleOptions = {};
          node.children.forEach((child) => {
            if (child.type === "mystOption") {
              roleOptions[child.name] = child.value;
            }
          });
          const templateContent = node.value || "";
          const isPureTemplate = templateContent.indexOf("{{") === -1;
          const { compiled, rendered } = renderTemplate(
            templateContent,
            globalVars,
            conf,
            "",
            roleOptions.lang,
          );
          const templateId = isPureTemplate ? null : templateIndex++;
          if (!isPureTemplate) {
            templates.push(compiled);
          }
          const newChildern = [];
          newChildern.push({
            type: "html",
            value:
              "<code " +
              (templateId !== null ? `data-z-code="${templateId}" ` : "") +
              (roleOptions.lang ? `data-z-lang="${roleOptions.lang}" ` : "") +
              ">",
          });
          rendered.split(/(<[^>]*>)/).forEach((part) => {
            if (part) {
              newChildern.push({
                type: part.startsWith("<") ? "html" : "text",
                value: part,
              });
            }
          });
          newChildern.push({
            type: "html",
            value: "</code>",
          });
          parent.children.splice(index, 1, ...newChildern);
          return [visitor.SKIP, index + newChildern.length];
        } else {
          const directiveOptions = node.options || {};
          const templateContent = node.value || "";
          let renderedHTML = "";
          if (directiveOptions.global) {
            if (!directiveOptions.input) {
              console.error(
                `Global directive must have input variables on page ${page}, block ${block} at line ${node.position.start.line}, column ${node.position.start.column}`,
              );
              process.exit(1);
            }
            renderedHTML = renderZForm(
              -1,
              directiveOptions.input.split(" "),
              conf.input,
              () => inputCounter++,
            );
            directiveOptions.input.split(" ").forEach((inputName) => {
              globalVars[inputName] = conf.input[inputName];
            });
          } else if (
            !directiveOptions.input &&
            templateContent.indexOf("{{") === -1
          ) {
            node.type = "code";
            node.value = templateContent;
            node.lang = directiveOptions.lang || "";
            return visitor.SKIP;
          } else {
            const templateId = templateIndex++;
            const { compiled, rendered } = renderTemplate(
              templateContent,
              globalVars,
              conf,
              directiveOptions.input,
              directiveOptions.lang,
            );
            templates.push(compiled);
            if (directiveOptions.input) {
              renderedHTML =
                renderZForm(
                  templateId,
                  directiveOptions.input.split(" "),
                  conf.input,
                  () => inputCounter++,
                ) + "\n";
            }
            renderedHTML +=
              `<pre data-z-code="${templateId}" ${directiveOptions.lang ? `data-z-lang="${directiveOptions.lang}" ` : ""}>\n` +
              rendered.trim() +
              "\n</pre>";
          }
          node.type = "html";
          node.value = renderedHTML;
          node.position = null;
          node.children = [];
          return visitor.SKIP;
        }
      },
    );
    const modifiedContent = toMarkdown(mdast);
    mdContent.push(modifiedContent);
  });
  mdContent.push("{% endraw %}");
  mdContent.unshift(
    `---
${JSON.stringify({ zconf: conf, templates }, null, 2)}
---`,
  );
  const finalContent = mdContent.join("\n");
  fs.writeFileSync(path.join(outputDir, `${page}.md`), finalContent, "utf-8");
});
