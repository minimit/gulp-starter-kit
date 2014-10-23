(function () {

	'use strict';

	if (typeof jQuery != 'undefined') {
		alert ('jquery working');
	}
	if (typeof $ != 'undefined') {
		alert ('jquery $ working');
	}
	if(typeof $().modal == 'function'){
		alert ('bootstrap working');
	}

	module.exports = function (n) {
		return 'browserify module.exports working';
	};

}());
