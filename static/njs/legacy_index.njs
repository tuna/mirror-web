import Mark from 'markup.min.njs';

function legacyIndexRender(r){
  function getMirDate(d){
    var result;
    if (d.last_update_ts) {
      var date = new Date(d.last_update_ts * 1000);
      if (date.getFullYear() > 2000) {
        result = `${('000'+date.getFullYear()).substr(-4)}-${('0'+(date.getMonth()+1)).substr(-2)}-${('0'+date.getDate()).substr(-2)}` +
          ` ${('0'+date.getHours()).substr(-2)}:${('0'+date.getMinutes()).substr(-2)}`;
      } else {
        result = "0000-00-00 00:00";
      }
    } else {
      result = d.last_update.replace(/(\d\d:\d\d):\d\d(\s\+\d\d\d\d)?/, '$1');
    }
    return result;
  }
  r.subrequest('/legacy_index.html', {
    args: '',
    body: '',
    method: 'GET'
  }, function(rTmpl){
    if(rTmpl.status != 200){
      return r.return(rTmpl.status);
    }
    var tmpl = rTmpl.responseBody;
    
    r.subrequest('/static/njs/options.json', {
      args: '',
      body: '',
      method: 'GET'
    }, function(rOpt){
      if(rOpt.status != 200){
        return r.return(rOpt.status);
      }
      var global_options;
      try{
        global_options = JSON.parse(rOpt.responseBody);
      }catch(e){
        return r.return(500);
      }
      var label_map = global_options.options.label_map;
      var help_url = {};
      global_options.helps.forEach((h) => help_url[h.mirrorid] = h.url);
      var new_mirrors = {};
      global_options.options.new_mirrors.forEach((m) => new_mirrors[m] = true);
      var unlisted = global_options.options.unlisted_mirrors;
      var force_help = {}
      global_options.options.force_redirect_help_mirrors.forEach((m) => force_help[m] = true);
      var descriptions = {};
      global_options.options.mirror_desc.forEach((m) => descriptions[m.name] = m.desc);
      r.subrequest('/static/tunasync.json', {
        args: '',
        body: '',
        method: 'GET'
      }, function(rMirs){
        var mirs = unlisted;
        if(rMirs.status == 200){
          try{
            mirs = mirs.concat(JSON.parse(rMirs.responseBody));
          }catch(e){
          }
        }
        var renMirs = mirs.filter(m => m.status != "disabled" && m.is_master !== false).map(m => {
          var status = m.status;
          var target = m;
          if(m.link_to){
            var _target = mirs.filter(_m => _m.name == m.link_to)[0];
            if(_target){
              target = _target;
              status = target.status;
            }
          }
          return {
            status: status,
            name: m.name,
            description: descriptions[m.name],
            url: force_help[m.name] ? help_url[m.name] : m.url ? m.url : '/' + m.name + '/',
            is_new: !!new_mirrors[m.name],
            help_url: help_url[m.name],
            last_update: getMirDate(target),
            label: label_map[status],
            show_status: status != 'success'
          };
        });
        renMirs.sort((a, b) => a.name < b.name ? -1: 1 );
        var result = Mark.up(tmpl, {mirs: renMirs});
        r.status = 200;
        r.headersOut['Content-Type'] = 'text/html';
        r.sendHeader();
        r.send(result);
        r.finish();
      })
    })
  });
  
}

export default legacyIndexRender;
