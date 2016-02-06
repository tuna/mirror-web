---
---
$(document).ready(() => {
	
	$.get("/news/news.md", function(data) {
		var rendered = marked(data);
		$("#news-content")
			.html(rendered)
			.find('table')
			.addClass("table table-bordered table-striped");
		$('#spinner').addClass('hidden');
		let target = window.location.hash.replace();
		$('html, body').animate({
			scrollTop: $(target).offset().top
		}, 100);
	});
	
});
// vim: ts=2 sts=2 sw=2 noexpandtab
