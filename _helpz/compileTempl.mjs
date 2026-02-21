import Hogan from "hogan.js";
import { writeSync } from "fs";
import { flattenData } from "../_src/lib/helpz-libs.mjs";
import hljs from "highlight.js";

async function* readInputs(stream) {
  let input = Buffer.alloc(0);
  let waitingForNL = true;
  let waitForBytes = 0;
  for await (const chunk of stream) {
    input = Buffer.concat([input, chunk]);
    while (true) {
      if (waitingForNL) {
        const nlIndex = input.indexOf("\n");
        if (nlIndex === -1) {
          break;
        }
        waitForBytes = parseInt(
          input.subarray(0, nlIndex).toString("utf8"),
          10,
        );
        input = input.subarray(nlIndex + 1);
        waitingForNL = false;
        if (waitForBytes <= 0) {
          return;
        }
      } else {
        if (input.length < waitForBytes) {
          break;
        }
        yield input.subarray(0, waitForBytes);
        input = input.subarray(waitForBytes);
        waitingForNL = true;
        waitForBytes = 0;
      }
    }
  }
}

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

for await (const inputData of readInputs(process.stdin)) {
  const result = { error: null, result: null };
  try {
    const input = JSON.parse(inputData.toString("utf8"));
    const { tmpl, globalVars, zconf, input: inputVars, lang } = input;
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
    result.result = { compiled: compiledTemplate, rendered: highlighted };
  } catch (error) {
    result.error = error.message;
    console.error("Error processing input:", error);
  }
  const output = Buffer.from(JSON.stringify(result), "utf8");
  writeSync(process.stdout.fd, output.length + "\n");
  writeSync(process.stdout.fd, output);
}
