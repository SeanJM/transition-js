const fs = require('fs');
const m = require('match-file-utility');
const isSite = require('../predicates/isSite');
const isProduction = require('../predicates/isProduction');

module.exports = isSite
  ? isProduction
    ? require('./site/site.production')
    : require('./site/site.development')
  // Is Plugin
  : isProduction
    ? require('./plugin/plugin.production')
    : require('./plugin/plugin.development');
