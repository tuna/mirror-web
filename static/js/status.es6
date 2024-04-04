---
---
document.addEventListener("DOMContentLoaded", () => {
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
      fetch("/static/status/disk.json").then((resp)=>resp.json()).then((d) => {
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
    const target = document.getElementById('mirror-list');
    const max = parseInt(target.attributes['data-tuna-roll-max'].value, 10);
    Array.from(target.querySelectorAll(".row:hover:not([data-tuna-roll-freeze])")).forEach((el) => {
      const attr = document.createAttribute('data-tuna-roll-freeze');
      attr.value = String((step) % max);
      el.attributes.setNamedItem(attr);
    })
    Array.from(target.querySelectorAll(".row:not(:hover)[data-tuna-roll-freeze]")).forEach((el) => {
      el.removeAttribute('data-tuna-roll-freeze');
    });
    step += 1;
    if(step < 0) step = 0;
    const attr = document.createAttribute('data-tuna-roll-cur');
    attr.value = String(step % max);
    target.attributes.setNamedItem(attr);
  }
  setInterval(doScroll, SCROLL_INTERVAL);
});
