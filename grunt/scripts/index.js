const fs = require('fs');
const m = require('match-file-utility');
const config = JSON.parse(fs.readFileSync('package.json'));

module.exports = config.isSite
  ? require('./site/site')
  // Is Plugin
  : require('./plugin/plugin');
