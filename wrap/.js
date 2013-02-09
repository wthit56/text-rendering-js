var wrap = (function () {
	var length, charWidth, line, lineLength, lineFind,
		lineFindTemplate = new String("^[\\W\\w]{{lineLength}}[\\W\\w]*?(?:\\s+|$)");
	var newline = /\n/, lineIndent;

	function wrap(text, width, indent, style) {
		var wrapped = [];

		if (style != null) { proxy.setStyle(style); }
		if (indent == null) { indent = 0; }

		if (newline.test(text)) {
			text = text.split(newline);
			var i = 0, l = text.length;
			while (i < l) {
				wrapped.push(wrap(text[i], width, indent));
				i++;
			}

			return wrapped;
		}

		length = text.length;
		charWidth = (proxy.test(text) / length);
		lineLength = Math.floor(width / charWidth);
		lineFind = new RegExp(lineFindTemplate.replace("{lineLength}", lineLength));

		lineIndent = indent;
		while (true) {
			line = lineFind.exec(text);
			if (!line) { break; }
			else { line = line[0]; }

			if (proxy.test(line) + lineIndent > width) {
				var shaveWord = /[\W\w]*?\s+(?=\S*?\s*$)/,
					shortLine = line;

				while (true) {
					shortLine = shaveWord.exec(shortLine)[0];
					if (!shortLine || (shortLine.length === 0)) {
						break;
					}
					else {
						if (proxy.test(shortLine) + lineIndent <= width) {
							line = shortLine;
							break;
						}
					}
				}
			}

			wrapped.push(line);
			text = text.substring(line.length);

			lineIndent = 0;
		}

		wrapped.push(text);

		return wrapped;
	};

	wrap.proxy = proxy;

	return wrap;
})();