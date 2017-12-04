module.exports = function ({ types: t }) {
	return {
		visitor: {
			CallExpression(path) {
				const regEx = "console";
				const regExProp = "log";
				const callee = path.get("callee");

				if (callee.matchesPattern(regEx, true)) {
					const prop = callee.node.property;
					if (prop && prop.name === regExProp) {
						path.remove();
					}
				}
			}
		}
	};
}