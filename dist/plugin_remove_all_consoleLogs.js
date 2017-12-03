"use strict";

module.exports = function (_ref) {
	var t = _ref.types;

	return {
		visitor: {
			CallExpression: function CallExpression(path) {
				var expectedPattern = "console";
				var expectedProp = "log";
				var callee = path.get("callee");

				if (callee.matchesPattern(expectedPattern, true)) {
					var prop = callee.node.property;
					if (prop && prop.name === expectedProp) {
						path.remove();
					}
				}
			}
		}
	};
};