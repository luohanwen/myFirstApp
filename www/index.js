require.config({
	//配置默认路径
	baseUrl: "./js/core",
	//配置资源路径
	paths: {
		zepto: "zepto",
		touch2mouse: "zepto.touch2mouse",
		iscroll: "iscroll",
		template: "template.min",
		jingle: "Jingle.debug"
	},
	waitSeconds: 30,
	//声明一些不符合amd规范的模块
	shim: {
		zepto: {
			exports: '$'
		},
		touch2mouse: {
			deps: ['zepto'],
			exports: 'touch2mouse'
		},
		iscroll: {
			exports: 'iScroll'
		},
		template: {
			exports: 'Temp'
		},
		jingle: {
			deps: ['zepto','touch2mouse'],
			exports: 'J'
		}
	}
});
define(['zepto', 'touch2mouse', 'iscroll', 'template', 'jingle'], function($, touch2mouse, iScroll, Temp, J) {
	console.info(1); 
	console.info($);
	console.info(2);
	console.info(touch2mouse);
	console.info(3);
	console.info(iScroll);
	console.info(4);
	console.info(Temp);
	console.info(5);
	console.info(J);


	
	var App = (function() {
		var pages = {};
		var run = function() {
			$.each(pages, function(k, v) {
				var sectionId = '#' + k + '_section';
				$('body').delegate(sectionId, 'pageinit', function() {
					v.init && v.init.call(v);
				});
				$('body').delegate(sectionId, 'pageshow', function(e, isBack) {
					//页面加载的时候都会执行
					v.show && v.show.call(v);
					//后退时不执行
					if (!isBack && v.load) {
						v.load.call(v);
					}
				});
			});
			J.Transition.add('flip', 'slideLeftOut', 'flipOut', 'slideRightOut', 'flipIn');
			J.launch();

		};
		var page = function(id, factory) {
			return ((id && factory) ? _addPage : _getPage).call(this, id, factory);
		};
		var _addPage = function(id, factory) {
			pages[id] = new factory();
		};
		var _getPage = function(id) {
			return pages[id];
		};
		//动态计算chart canvas的高度，宽度，以适配终端界面
		var calcChartOffset = function() {
			return {
				height: $(document).height() - 44 - 30 - 60,
				width: $(document).width()
			};

		};
		return {
			run: run,
			page: page,
			calcChartOffset: calcChartOffset
		};
	})();


	App.page('index', function() {
		this.init = function() {
			// alert("index");
		};
	});

	App.page('demo1', function() {
		this.init = function() {
			// alert("demo1");
		};
	});

	App.page('demo5', function() {
		this.init = function() {
			$("#calendar_test").unbind("focus").bind("focus", function() {
				J.popup({
					html: '<div id="popup_calendar"></div>',
					pos: 'center',
					backgroundOpacity: 0.4,
					showCloseBtn: false,
					onShow: function() {
						new J.Calendar('#popup_calendar', {
							date: new Date(2013, 7, 1),
							onSelect: function(date) {
								$('#calendar_test').val(date);
								J.closePopup();
							}
						});
					}
				});
			});
		};
	});



	$(function() {
		App.run();
	});
});
