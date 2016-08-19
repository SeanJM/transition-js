const flatman = require('./flatman');
const scripts = require('./scripts');
const css = require('./css');
const images = require('./images');
const fonts = require('./fonts');

const isProduction = require('./predicates/isProduction');

module.exports = {
  copy : {
    fonts : isProduction
      ? {}
      : {
        expand : true,
        flatten : true,
        src : fonts.files,
        dest : 'bin/'
      },

    images : isProduction
      ? {}
      : {
        expand : true,
        flatten : true,
        src : images.files,
        dest : 'bin/'
      }
  },

  sass : css.task.sass,

  cssmin : {
    files : { 'bin/bundle.min.css' : 'bin/bundle.css' }
  },

  concat : scripts.task.concat,

  uglify : scripts.task.uglify,

  autoprefixer : css.task.autoprefixer,

  imagemin : {
    static : {
      options : {
        optimizationLevel : 3,
        svgoPlugins : [{ removeViewBox : false }],
        use : [],
      },
      files : isProduction
        ? images.dest
        : {}
    }
  },

  watch : isProduction
    ? {}
    : Object.assign({
    css : {
      files : css.glob,
      tasks : ['sass', 'autoprefixer']
    },

    // Flatman
    flatman : {
      files : flatman.glob,
      tasks : ['flatman']
    },

    // Config and Environment
    configFiles : {
      files : ['Gruntfile.js'],
      options : {
        reload : true
      },
      tasks: ['default']
    },

    dotenv : {
      files : ['.env'],
      options : { reload : true },
      tasks : ['default']
    }
  }, scripts.task.watch)
};
