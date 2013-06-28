var utils = {};

utils.wait = function(callbacks, done) {
	var counter = callbacks.length,
	next = function() {
		if(--counter === 0) {
			done();
		}
	};
	for(var i = 0; i < callbacks.length; i++) {
		callbacks[i](next);
	}
};

module.exports = utils;