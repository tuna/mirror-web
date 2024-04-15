import "../lib/njs-polyfill";
import Mark from "markup-js";
import processingHandlers from "../lib/mirrorListDataProcessing";
import { TUNASYNC_JSON_PATH } from "../lib/consts";

export function legacyIndexRender(r: NginxHTTPRequest) {
  r.subrequest(
    "/legacy_index.html",
    {
      args: "",
      body: "",
      method: "GET",
    },
    function (rTmpl) {
      if (rTmpl.status != 200) {
        return r.return(rTmpl.status);
      }
      var tmpl = rTmpl.responseText;

      r.subrequest(
        "/static/njs/options.json",
        {
          args: "",
          body: "",
          method: "GET",
        },
        function (rOpt) {
          if (rOpt.status != 200) {
            return r.return(rOpt.status);
          }
          let global_options;
          try {
            global_options = JSON.parse(rOpt.responseText);
          } catch (e) {
            return r.return(500);
          }
          const {
            unlistedMirrors: unlisted,
            genMainMirrorList,
            postProcessStatusData,
          } = processingHandlers(global_options.options);
          const help_url = Object.fromEntries(
            global_options.helps.map((h) => [h.mirrorid, h.url]),
          );
          r.subrequest(
            TUNASYNC_JSON_PATH,
            {
              args: "",
              body: "",
              method: "GET",
            },
            function (rMirs) {
              let mirs = [];
              if (rMirs.status == 200) {
                try {
                  mirs = JSON.parse(rMirs.responseText);
                } catch (e) {}
              }
              const renMirs = genMainMirrorList(
                postProcessStatusData(mirs, unlisted),
                help_url,
              );
              var result = Mark.up(tmpl, { mirs: renMirs });
              r.status = 200;
              r.headersOut["Content-Type"] = "text/html";
              r.sendHeader();
              r.send(result);
              r.finish();
            },
          );
        },
      );
    },
  );
}
