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
		$this.off('transitioncancel.reset');
		setTimeout(function(){
			$this.removeClass('notrans');
		}, 0);
	}
	var clearResetHandler = function(e){
		var $this = $(this);
		$this.off('transitionend.reset')
	}
	setInterval(function(){
		if($('#mirror-list .hidden-md:not(.hidden-xs):not(.hidden-sm)').css('display') != 'none'){
			return;
		}
		step += 1;
		var $objs = $('tr:not(:hover):not(:active) > td[class*="rolling-"] > div');
		$objs.each(function(){
			var $this = $(this);
			var index = $this.children('div[data-tuna-roll-seq~="'+step+'"]').index();
			if(index == -1){
				return;
			}
			$this.css("transform", `translateY(-${index * 100}%)`);
		});
		step %= 6;
		if(step == 0){
			$objs.one('transitionend.reset', resetToZeroHandler);
			$objs.one('transitioncancel.reset', clearResetHandler);
		}
	}, 2500);
});
