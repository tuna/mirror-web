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
	var step = 0;
	var resetToZeroHandler = function(e){
		var $this = $(this);
		$this.addClass('notrans').css("transform", "translateY(0)");
		setTimeout(function(){
			$this.removeClass('notrans');
		}, 0);
	}
	setInterval(function(){
		step += 1;
		var $objs = $('');
		
		var $objs3 = $("tr:not(:hover):not(:active):not(.last-succ) > .rolling-3 > div");
		$objs3.css("transform", `translateY(-${Math.floor(step / 2) * 100}%)`);
		$objs = $objs.add($objs3);
		
		var $objs3_1 = $("tr.last-succ:not(:hover):not(:active) > .rolling-3 > div");
		var pos = Math.floor(step / 2);
		if(pos >= 1) pos--;
		$objs3_1.css("transform", `translateY(-${pos * 100}%)`);
		$objs = $objs.add($objs3_1);
		
		var $objs6 = $("tr:not(:hover):not(:active):not(.status-syncing) > .rolling-6 > div");
		$objs6.css("transform", `translateY(-${step * 100}%)`);
		$objs = $objs.add($objs6);
		
		var $objs6_1 = $("tr.status-syncing:not(:hover):not(:active) > .rolling-6 > div");
		pos = step;
		if(pos >= 5) pos--;
		$objs6_1.css("transform", `translateY(-${pos * 100}%)`);
		$objs = $objs.add($objs6_1);
		
		step %= 6;
		if(step == 0){
			$objs.one('transitionend', resetToZeroHandler);
		}
	}, 2500);
});
