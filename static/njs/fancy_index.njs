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
    var tmpl = rTmpl.responseBody;
    var result = Mark.up(tmpl, {
      url: r.variables.request_uri.replace(/\/+/g, '/').replace(/\?.*$/, ''),
      open: '{{',
      close: '}}',
    });
    r.status = 200;
    r.headersOut['Content-Type'] = 'text/html';
    r.sendHeader();
    r.send(result);
    r.finish();
  });
}

function fancyIndexBeforeRender(r){
  if(r.variables.isbrowser && r.variables.isbrowser != '0'){
    return fancyIndexRender(r, '/fancy-index/before.html');
  }else{
    return fancyIndexRender(r, '/fancy-index/before-legacy.html');
  }
}

function fancyIndexAfterRender(r){
  if(r.variables.isbrowser && r.variables.isbrowser != '0'){
    return fancyIndexRender(r, '/fancy-index/after.html');
  }else{
    return fancyIndexRender(r, '/fancy-index/after-legacy.html');
  }
}

export default [fancyIndexBeforeRender, fancyIndexAfterRender];
