---
---
$(document).ready(() => {
  function readableFileSize(size) {
    var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = 0;
    while(size >= 1024) {
      size /= 1024;
      ++i;
    }
    return size.toFixed(1) + ' ' + units[i];
  }

  const diskUsage = new Vue({
    el: "#disk-usage",
    data: {
      diskUsages: []
    },
    created () {
      $.get("{{ '/static/status/disk.json' | relative_url }}", (d) => {
        if(!Array.isArray(d)){
          d = [d];
        }
        this.diskUsages = d.map((disk) => ({
          desc: disk.desc,
          used: readableFileSize(disk.used_kb * 1024),
          total: readableFileSize(disk.total_kb * 1024),
          percentage: 0,
          _percentage: Math.round(disk.used_kb * 100 / disk.total_kb)
        }));
        setTimeout(()=>{
          this.diskUsages.forEach((disk) => {
            disk.percentage = disk._percentage;
          });
        }, 0);
      });
    }
  });
  
  const SCROLL_INTERVAL = 2000;

  var step = 0;
  const doScroll = function() {
    const $target = $('#mirror-list');
    const max = parseInt($target.attr('data-tuna-roll-max'), 10);
    $('#mirror-list .row:hover:not([data-tuna-roll-freeze])').attr('data-tuna-roll-freeze', step % max);
    $('#mirror-list .row:not(:hover)[data-tuna-roll-freeze]').removeAttr('data-tuna-roll-freeze');
    step += 1;
    if(step < 0) step = 0;
    $target.attr('data-tuna-roll-cur', step % max);
  }
  setInterval(doScroll, SCROLL_INTERVAL);
});
