---
---
document.addEventListener("DOMContentLoaded", () => {

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
