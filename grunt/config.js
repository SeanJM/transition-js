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

  sass : {
    dist : {
      files : { 'bin/bundle.css' : css.import },
      options : isProduction
        ? {}
        : {
          trace : true,
          sourcemap : 'inline'
        }
    }
  },

  cssmin : {
    options : {},
    bundle : isProduction
      ? { files : { 'bin/bundle.min.css' : 'bin/bundle.css' } }
      : {}
  },

  concat : isProduction
    ? { empty : {} }
    : scripts.task.concat,

  uglify : {
    options : { mangle : true },
    bundle : {
      files : isProduction
        ? scripts.task.uglify
        : []
    }
  },

  autoprefixer : {
    options : {
      browsers : ['last 3 version'],
      map : true
    },

    single_file : {
      src : 'bin/bundle.css',
      dest : 'bin/bundle.css'
    },
  },

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
