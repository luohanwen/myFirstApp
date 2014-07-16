require.config({
	baseUrl: "js/core/",
	paths: {
		zepto: "zepto",
		touch2mouse: "zepto.touch2mouse",
	},
	waitSeconds: 30,
	shim: {
		zepto: {
			exports: '$'
		},
		touch2mouse: {
			deps:['zepto'],
			exports: 'touch2mouse'
		}
	}
});
require(["touch2mouse"], function(touch2mouse) {
	console.info("haven");
	console.info(touch2mouse);
});