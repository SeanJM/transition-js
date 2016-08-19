const fs = require('fs');
const value = {};

fs.readFileSync('.env', 'utf8').split('\n').forEach(function (v) {
  var left = v.split(' ')[0];
  var right = v.split(' ')[1];

  if (right === 'false') {
    right = false;
  } else if (right === 'true') {
    right = true;
  }

  value[left] = right;
});

module.exports = value;
