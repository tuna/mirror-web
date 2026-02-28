import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

export function renderZForm(codeId, inputChoices, inputVars, counterGen) {
  return renderToStaticMarkup(
    <div>
      {(() => {
        const children = [];
        inputChoices.forEach((inputName) => {
          const input = inputVars[inputName];
          const inputId = "zhelp-input-" + counterGen();
          const toolTip = input.note || undefined;
          children.push(
            <label htmlFor={inputId} title={toolTip} key={inputId}>
              {input["_"]}
            </label>,
          );
          if (input.option) {
            children.push(
              <select
                id={inputId}
                data-z-name={inputName}
                data-z-for-code={codeId}
                title={toolTip}
                key={inputId}
                defaultValue={
                  (input.option &&
                    Object.entries(input.option).find(
                      ([, optionValue]) => optionValue && optionValue.default,
                    )?.[0]) ||
                  undefined
                }
              >
                {input.option &&
                  Object.entries(input.option).map(
                    ([optionName, optionValue]) => (
                      <option
                        value={optionName}
                        key={optionName}
                        {...(() => {
                          const attrs = {};
                          optionValue &&
                            Object.entries(optionValue).forEach(
                              ([key, value]) => {
                                if (key !== "default" && key !== "_") {
                                  attrs[`data-z-set-${key}`] = value;
                                }
                              },
                            );
                          return attrs;
                        })()}
                      >
                        {optionValue && optionValue["_"]
                          ? optionValue["_"]
                          : optionName}
                      </option>
                    ),
                  )}
              </select>,
            );
          } else if (
            input["true"] !== undefined ||
            input["false"] !== undefined
          ) {
            children.push(
              <input
                id={inputId}
                type="checkbox"
                data-z-name={inputName}
                data-z-for-code={codeId}
                title={toolTip}
                defaultChecked={!!input.default}
                data-z-true={input["true"]}
                data-z-false={input["false"]}
                key={inputId}
              />,
            );
          } else {
            children.push(
              <input
                id={inputId}
                type="text"
                data-z-name={inputName}
                data-z-for-code={codeId}
                title={toolTip}
                defaultValue={input.default || ""}
                key={inputId}
              />,
            );
          }
        });
        return children;
      })()}
    </div>,
  );
}
