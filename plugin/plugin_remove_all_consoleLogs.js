module.exports = function ({ types: t }) {
	return {
		visitor: {
			CallExpression(path) {
				const expectedPattern = "console";
				const expectedProp = "log";
				const callee = path.get("callee");

				if (callee.matchesPattern(expectedPattern, true)) {
					var prop = callee.node.property;
					if (prop && prop.name === expectedProp) {
						path.remove();
					}
				}
			}
		}
	};
}