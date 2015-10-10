$(document).ready(() => {
	
	$.get("/news/news.md", function(data) {
		var rendered = marked(data);
		$("#news-content")
			.html(rendered)
			.find('table')
			.addClass("table table-bordered table-striped");
		$('#spinner').addClass('hidden');
	});

});
// vim: ts=2 sts=2 sw=2 noexpandtab
