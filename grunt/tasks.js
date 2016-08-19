const css = require('./css');
const fonts = require('./fonts');
const images = require('./images');
const scripts = require('./scripts');
const isProduction = require('./predicates/isProduction');
const isSite = require('./predicates/isSite');

let tasks = [];

if (scripts.files.length) {
  if (isProduction) {
    tasks.push('uglify');
  } else {
    tasks.push('concat');
  }
}

if (css.files.length) {
  tasks.push('sass');
  tasks.push('autoprefixer');
  if (isProduction) {
    tasks.push('cssmin');
  }
}

if (fonts.files.length) {
  tasks.push('copy:fonts');
}

if (images.files.length) {
  if (isProduction) {
    tasks.push('imagemin');
  } else {
    tasks.push('copy:images');
  }
}

tasks.push(
  'flatman',
  'watch'
);

module.exports = tasks;
