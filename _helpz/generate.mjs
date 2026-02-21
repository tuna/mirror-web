import { parseArgs } from "node:util";
import { parse as yamlParse } from "yaml";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { registerHooks } from "node:module";

const MOCKED_PREFIX = "\x00__mocked_tagname";

const TEMPLATE_TAG_NAME = "tmpl";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "micromark-util-html-tag-name") {
      const resolved = nextResolve(specifier, context);
      resolved.url = MOCKED_PREFIX + resolved.url;
      return resolved;
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.startsWith(MOCKED_PREFIX)) {
      const actualUrl = url.slice(MOCKED_PREFIX.length);
      const result = nextLoad(actualUrl, context);
      const code = result.source.toString("utf-8");
      const modifiedCode =
        code +
        `
htmlRawNames.push(${JSON.stringify(TEMPLATE_TAG_NAME)});
`;
      result.source = Buffer.from(modifiedCode, "utf-8");
      return result;
    }
    return nextLoad(url, context);
  },
});

const { fromMarkdown } = await import("mdast-util-from-markdown");
const { toMarkdown } = await import("mdast-util-to-markdown");
const visitor = await import("unist-util-visit");

import {
  Parser as Parse5Parser,
  TokenizerMode as Parse5TokenizerMode,
} from "parse5";
import {
  textOf as parse5TextOf,
  attributesOf as parse5AttributesOf,
} from "parse5-utilities";

class Parser extends Parse5Parser {
  _initTokenizerForFragmentParsing() {
    if (this.fragmentContext) {
      if (
        this.treeAdapter.getTagName(this.fragmentContext) == TEMPLATE_TAG_NAME
      ) {
        this.tokenizer.state = Parse5TokenizerMode.RAWTEXT;
        return;
      }
    }
    return super._initTokenizerForFragmentParsing();
  }
  _startTagOutsideForeignContent(token) {
    if (token.tagName == TEMPLATE_TAG_NAME) {
      this._switchToTextParsing(token, Parse5TokenizerMode.RAWTEXT);
      return;
    }
    return super._startTagOutsideForeignContent(token);
  }
}

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

const pathsForPage = (page, file) => ({
  local: path.join(docsDir, "local", page, file),
  global: path.join(docsDir, "global", page, file),
});

const loadFile = (page, file, defaultValue) => {
  const { local: localPath, global: globalPath } = pathsForPage(page, file);
  if (fs.existsSync(localPath)) {
    return fs.readFileSync(localPath, "utf-8");
  } else if (fs.existsSync(globalPath)) {
    return fs.readFileSync(globalPath, "utf-8");
  } else if (defaultValue !== undefined) {
    console.warn(`file ${file} not found in page ${page}`);
    return defaultValue;
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

enablePages.forEach((page) => {
  const conf = loadConf(page, language);
  const mdContent = [];
  mdContent.push(
    `---
${JSON.stringify({ zconf: conf }, null, 2)}
---
{% raw %}
`,
  );
  mdContent.push(`# ${conf["_"]}\n`);
  mdContent.push("{% endraw %}{% include zglobal.html %}{% raw %}\n");
  const blocks = conf.block || ["index"];
  blocks.forEach((block) => {
    const blockContent = loadBlock(page, block, language);
    const mdast = fromMarkdown(blockContent);
    const stack = [];
    visitor.visit(mdast, "html", (node) => {
      const html = node.value.trim();
      if (html === `</${TEMPLATE_TAG_NAME}>`) {
        if (stack.length === 0) {
          console.error(
            `unexpected closing tag found in page ${page}, block ${block}, at ${node.position.start.line}:${node.position.start.column}`,
          );
          process.exit(1);
        }
        node.type = "html";
        node.value = stack.pop();
        node.position = null;
        return visitor.SKIP;
      }
      const parser = Parser.getFragmentParser(null);
      parser.tokenizer.write(html, true);
      const document = parser.getFragment();
      if (
        !document ||
        !document.childNodes ||
        document.childNodes.length === 0
      ) {
        return visitor.CONTINUE;
      }
      if (document.childNodes.length > 1) {
        return visitor.CONTINUE;
      }
      const root = document.childNodes[0];
      if (root.tagName !== TEMPLATE_TAG_NAME) {
        return visitor.CONTINUE;
      }
      const templateContent = parse5TextOf(root).trim();
      const hasClosingTag = html.indexOf(`</${TEMPLATE_TAG_NAME}>`) !== -1;
      let isPureTemplate = !!hasClosingTag;
      const attribs = parse5AttributesOf(root);
      if (templateContent.indexOf("{{") !== -1) {
        isPureTemplate = false;
      } else if (attribs && attribs["z-global"] !== undefined) {
        isPureTemplate = false;
      }
      if (isPureTemplate) {
        node.value = templateContent;
        if (attribs && attribs["z-inline"] !== undefined) {
          node.type = "inlineCode";
        } else {
          node.type = "code";
          node.lang = attribs && attribs["z-lang"] ? attribs["z-lang"] : null;
          node.meta = null;
        }
        node.position = null;
        return visitor.SKIP;
      }
      const exportedParam = {};
      if (attribs) {
        if (attribs["z-global"] !== undefined) {
          exportedParam.global = "true";
        }
        if (attribs["z-lang"] !== undefined) {
          exportedParam.lang = attribs["z-lang"];
        }
        if (attribs["z-inline"] !== undefined) {
          exportedParam.inline = "true";
        }
        if (attribs["z-input"] !== undefined) {
          exportedParam.input = attribs["z-input"];
        }
      }
      for (const key in exportedParam) {
        const forbiddenChars = ['"', "'", "\n", "\r"];
        for (const char of forbiddenChars) {
          if (exportedParam[key].indexOf(char) !== -1) {
            console.error(
              `forbidden char ${char} found in exported param ${key} with value ${exportedParam[key]} in page ${page}, block ${block}`,
            );
            process.exit(1);
          }
        }
      }
      node.type = "html";
      const exportStringBegin = "{% endraw %}{% capture ztmpl %}{% raw %}";
      let exportStringEnd = "{% endraw %}{% endcapture %}";
      exportStringEnd += "{% include zcode.html tmpl=ztmpl ";
      for (const key in exportedParam) {
        exportStringEnd += `${key}='${exportedParam[key]}' `;
      }
      exportStringEnd += "%}{% raw %}";
      if (hasClosingTag) {
        node.value = exportStringBegin + templateContent + exportStringEnd;
      } else {
        node.value = exportStringBegin + templateContent;
        stack.push(exportStringEnd);
      }
      node.position = null;
      return visitor.SKIP;
    });
    if (stack.length > 0) {
      console.error(
        `unclosed tag found during processing page ${page}, block ${block}`,
      );
      process.exit(1);
    }
    const modifiedContent = toMarkdown(mdast);
    mdContent.push(modifiedContent);
  });
  mdContent.push("{% endraw %}");
  const finalContent = mdContent.join("\n");
  fs.writeFileSync(path.join(outputDir, `${page}.md`), finalContent, "utf-8");
});
