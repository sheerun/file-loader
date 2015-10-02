/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var loaderUtils = require("loader-utils");
var path = require("path");

module.exports = function(content) {
	this.cacheable && this.cacheable();
	if(!this.emitFile) throw new Error("emitFile is required from module system");
	var query = loaderUtils.parseQuery(this.query);
	var url = loaderUtils.interpolateName(this, query.name || "[hash].[ext]", {
		context: query.context || this.options.context,
		content: content,
		regExp: query.regExp
	});
	this.emitFile(url, content);

	var wrapper = query.wrapper || '[url]';

	url = (this.options.output.publicPath || '') + url;
	url = wrapper.replace('[url]', JSON.stringify(url));

	return "module.exports = " + url;
}
module.exports.raw = true;
