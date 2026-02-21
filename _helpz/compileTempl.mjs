import Hogan from "hogan.js";
import { writeSync } from "fs";

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

for await (const inputData of readInputs(process.stdin)) {
  const result = { error: null, result: null };
  try {
    const input = JSON.parse(inputData.toString("utf8"));
    const { tmpl } = input;
    const compiledTemplate = Hogan.compile(tmpl, { asString: true });
    result.result = { compiled: compiledTemplate, rendered: tmpl };
  } catch (error) {
    result.error = error.message;
  }
  const output = Buffer.from(JSON.stringify(result), "utf8");
  writeSync(process.stdout.fd, output.length + "\n");
  writeSync(process.stdout.fd, output);
}
