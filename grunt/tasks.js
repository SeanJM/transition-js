const fs = require('fs');
const css = require('./css');
const fonts = require('./fonts');
const images = require('./images');
const scripts = require('./scripts');
const clean = require('./clean');
const config = JSON.parse(fs.readFileSync('package.json'));

let tasks = [];

if (scripts.files.length) {
  if (config.isProduction) {
    tasks.push('uglify');
  } else {
    tasks.push('concat');
  }
}

if (css.files.length) {
  tasks.push('sass');
  tasks.push('autoprefixer');
  if (config.isProduction) {
    tasks.push('cssmin');
  }
}

if (fonts.files.length) {
  tasks.push('copy:fonts');
}

if (images.files.length) {
  if (config.isProduction) {
    tasks.push('imagemin');
  } else {
    tasks.push('copy:images');
  }
}

tasks.push(
  'flatman'
);

if (!config.isProduction) {
  tasks.push('watch');
}

module.exports = tasks;
