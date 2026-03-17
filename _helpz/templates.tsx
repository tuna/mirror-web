import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

export function renderZForm(
  codeId: number,
  inputChoices: string[],
  inputVars: Record<string, any>,
  counterGen: () => number,
) {
  return renderToStaticMarkup(
    <div className="d-flex flex-wrap align-items-center gap-3 mb-3 mt-3 zhelp-form">
      {(() => {
        const children = [] as React.ReactNode[];
        inputChoices.forEach((inputName) => {
          const input = inputVars[inputName];
          const inputId = "zhelp-input-" + counterGen();
          const toolTip = input.note || undefined;
          let control;
          if (input.option) {
            control = (
              <select
                id={inputId}
                className="form-select"
                style={{ width: "auto" }}
                data-z-name={inputName}
                data-z-for-code={codeId}
                title={toolTip}
                key={inputId}
                defaultValue={(input.option && input.default) || undefined}
              >
                {input.option &&
                  Object.entries(
                    input.option as Record<string, Record<string, any>>,
                  ).map(([optionName, optionValue]) => (
                    <option
                      value={optionName}
                      key={optionName}
                      {...(() => {
                        const attrs: Record<string, string> = {};
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
                  ))}
              </select>
            );
          } else if (
            input["true"] !== undefined ||
            input["false"] !== undefined
          ) {
            control = (
              <div className="form-control form-switch form-check">
                <input
                  id={inputId}
                  className="form-check-input"
                  type="checkbox"
                  data-z-name={inputName}
                  data-z-for-code={codeId}
                  title={toolTip}
                  defaultChecked={!!input.default}
                  data-z-true={input["true"]}
                  data-z-false={input["false"]}
                  key={inputId}
                />
              </div>
            );
          } else {
            control = (
              <input
                id={inputId}
                className="form-control form-control-sm"
                style={{ width: "auto" }}
                type="text"
                data-z-name={inputName}
                data-z-for-code={codeId}
                title={toolTip}
                defaultValue={input.default || ""}
                key={inputId}
              />
            );
          }
          children.push(
            <div className="form-floating" key={inputId}>
              {control}
              <label htmlFor={inputId} title={toolTip}>
                {input["_"]}
              </label>
            </div>,
          );
        });
        return children;
      })()}
    </div>,
  );
}

export function renderCodeBlock(
  code: string | null,
  renderedCode: string,
  otherAttrs: Record<string, string>,
) {
  return renderToStaticMarkup(
    <pre {...otherAttrs} className="codeblock">
      <code dangerouslySetInnerHTML={{ __html: renderedCode }}></code>
      {code != null && <code data-original-code>{code}</code>}
      <button
        type="button"
        className="btn-clipboard"
        aria-label="Copy to clipboard"
      >
        <span>
          <i>{`{%endraw%}{% fa_svg far.fa-clipboard %}{%raw%}`}</i>
          <i
            data-checked
          >{`{%endraw%}{% fa_svg fas.fa-clipboard-check %}{%raw%}`}</i>
        </span>
      </button>
    </pre>,
  );
}
