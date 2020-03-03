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
  $.get("/static/status/disk.json", (d) => {
    var used_percent = Math.round(d.used_kb * 100 / d.total_kb);
    $('#disk-usage-bar')
      .attr("aria-valuenow", used_percent)
      .css("width", used_percent + "%")
      .html("<strong>" + readableFileSize(d.used_kb * 1024) + " / " + readableFileSize(d.total_kb * 1024) + "</strong>");
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
