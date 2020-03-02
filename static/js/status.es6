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

  kickstartScroll();
});

// Scrolling

const SCROLL_INTERVAL = 2000;
function kickstartScroll() {
  console.log('Scroll start...');
  setInterval(doScroll, SCROLL_INTERVAL);
}

var step = 0;
function doScroll() {
  step += 1;
  const targets = $('#mirror-list .row:not(:hover) .tuna-roll');
  targets.each(function() {
    const target = $(this);
    const max = parseInt(target.attr('data-tuna-roll-max'), 10);

    target.attr('data-tuna-roll-cur', step % max);
  });
}
