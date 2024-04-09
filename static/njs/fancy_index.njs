import Mark from 'markup.min.njs';

function fancyIndexRender(r, templateUrl){
  r.subrequest(templateUrl, {
    args: '',
    body: '',
    method: 'GET'
  }, function(rTmpl){
    if(rTmpl.status != 200){
      return r.return(rTmpl.status);
    }
    var tmpl = rTmpl.responseText;
    var result = Mark.up(tmpl, {
      url: r.variables.request_uri.replace(/\/+/g, '/').replace(/\?.*$/, ''),
    });
    r.status = 200;
    r.headersOut['Content-Type'] = 'text/html';
    r.sendHeader();
    r.send(result);
    r.finish();
  });
}

function fancyIndexBeforeRender(r){
  return fancyIndexRender(r, '/fancy-index/before.html');
}

function fancyIndexAfterRender(r){
  return fancyIndexRender(r, '/fancy-index/after.html');
}

export default {fancyIndexBeforeRender, fancyIndexAfterRender};
