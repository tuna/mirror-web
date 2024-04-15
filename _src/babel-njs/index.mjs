import { declare } from "@babel/helper-plugin-utils";
import {
  isModule,
  rewriteModuleStatementsAndPrepareHeader,
  isSideEffectImport,
  buildNamespaceInitStatements,
  ensureStatementsHoisted,
  wrapInterop,
  getModuleName,
} from "@babel/helper-module-transforms";

import { template, types as t } from "@babel/core";

import { makeInvokers } from "./hooks.mjs";

export default declare((api) => {
  return {
    name: "transform-njs-module",

    visitor: {
      Program: {
        exit(path, state) {
          if (!isModule(path)) return;

          // Rename the bindings auto-injected into the scope so there is no
          // risk of conflict between the bindings.
          path.scope.rename("exports");

          let moduleName = getModuleName(this.file.opts, {});
          // @ts-expect-error todo(flow->ts): do not reuse variables
          if (moduleName) moduleName = t.stringLiteral(moduleName);

          const hooks = makeInvokers(this.file);

          const { meta, headers } = rewriteModuleStatementsAndPrepareHeader(
            path,
            {
              exportName: "exports",
              constantReexports: true,
              enumerableModuleMeta: true,
              strict: true,
              strictMode: true,
              allowTopLevelThis: true,
              importInterop: "none",
              wrapReference: hooks.wrapReference,
              getWrapperPayload: hooks.getWrapperPayload,
              esNamespaceOnly: true,
              filename: this.file.opts.filename,
            },
          );

          headers.unshift(...template.statements.ast(`
            const exports = {};
            export default exports;
          `));

          for (const [source, metadata] of meta.source) {
            let header;
            if (isSideEffectImport(metadata)) {
              header = t.importDeclaration([], t.stringLiteral(source));
            } else {
              header = t.importDeclaration([t.importDefaultSpecifier(t.identifier(metadata.name))], t.stringLiteral(source));
            }
            header.loc = metadata.loc;

            headers.push(header);
            headers.push(
              ...buildNamespaceInitStatements(
                meta,
                metadata,
                hooks.wrapReference,
              ),
            );
          }

          ensureStatementsHoisted(headers);
          path.unshiftContainer("body", headers);
          path.get("body").forEach(path => {
            if (headers.indexOf(path.node) === -1) return;
            if (path.isVariableDeclaration()) {
              path.scope.registerDeclaration(path);
            }
          });
        },
      },
    },
  };
});
