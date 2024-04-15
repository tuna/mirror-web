import Mark from "markup-js";

function fancyIndexRender(r: NginxHTTPRequest, templateUrl: string) {
  r.subrequest(
    templateUrl,
    {
      args: "",
      body: "",
      method: "GET",
    },
    function (rTmpl) {
      if (rTmpl.status != 200) {
        return r.return(rTmpl.status);
      }
      const tmpl = rTmpl.responseText;
      const result = Mark.up(tmpl, {
        url: r.variables.request_uri.replace(/\/+/g, "/").replace(/\?.*$/, ""),
      });
      r.status = 200;
      r.headersOut["Content-Type"] = "text/html";
      r.sendHeader();
      r.send(result);
      r.finish();
    },
  );
}

export function fancyIndexBeforeRender(r: NginxHTTPRequest) {
  return fancyIndexRender(r, "/fancy-index/before.html");
}

export function fancyIndexAfterRender(r: NginxHTTPRequest) {
  return fancyIndexRender(r, "/fancy-index/after.html");
}
