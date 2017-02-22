const devConfig = require('./devConfig.js');
const productionConfig = require('./productionConfig.js');

module.exports = function(env) {
	return env === 'production' ? productionConfig : devConfig;
};