var justify = (function () {
	return function justify(text, width, style) {
		text = text.replace(/\s*$/, "");
		if (style) { proxy.setStyle(style); }

		var renderWidth = proxy.test(text.replace(/ /g, ""));
		var space = width - renderWidth;
		var wordsLength = text.split(" ").length;
		return (space / (wordsLength - 1));
	};
})();