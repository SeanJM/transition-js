const fs = require('fs');
const css = require('./css');
const fonts = require('./fonts');
const images = require('./images');
const scripts = require('./scripts');
const clean = require('./clean');
const config = JSON.parse(fs.readFileSync('package.json'));

let tasks = [];

if (scripts.list.length) {
  if (config.gruntBuild.isProduction) {
    tasks.push('uglify');
  } else {
    tasks.push('concat');
  }
}

if (css.list.length) {
  tasks.push('sass', 'autoprefixer');
  if (config.gruntBuild.isProduction) {
    tasks.push('cssmin');
  }
}

if (fonts.files.length) {
  tasks.push('copy:fonts');
}

if (images.files.length) {
  if (config.gruntBuild.isProduction) {
    tasks.push('imagemin');
  } else {
    tasks.push('copy:images');
  }
}

tasks.push(
  'flatman'
);

if (!config.gruntBuild.isProduction) {
  tasks.push('watch');
}

module.exports = tasks;
