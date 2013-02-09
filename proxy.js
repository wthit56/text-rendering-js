window.proxy = (function () {
	var render = document.body.appendChild(document.createElement("render"));
	render.style.whiteSpace = "nowrap";
	render.style.visibility = "hidden";
	render.style.position = "absolute";
	render.style.display = "none";

	var proxy = render.appendChild(document.createElement("proxy"));
	proxy.render = render;

	proxy.setStyle = function (style) {
		proxy.style = style;
	};

	proxy.test = (function () {
		var width;

		return function proxy_test(text) {
			proxy.innerText = text;
			proxy.render.style.display = "inline";
			width = proxy.offsetWidth;
			proxy.render.style.display = "none";
			return width;
		};
	})();

	return proxy;
})();
