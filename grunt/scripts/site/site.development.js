const files = require('./site.files');

module.exports = {
  files : files.list,
  dest : files.dest,

  task : {
    watch : {
      constants : {
        files : files.src.constants,
        tasks : ['concat:constants'],
        options : {}
      },

      vendor : {
        files : files.src.vendor,
        tasks : ['concat:vendor'],
        options : {}
      },

      components : {
        files : files.src.components,
        tasks : ['concat:components'],
        options : {}
      },

      containers : {
        files : files.src.containers,
        tasks : ['concat:containers'],
        options : {}
      },

      custom : {
        files : files.src.custom,
        tasks : ['concat:custom'],
        options : {}
      },

      collections : {
        files : files.src.collections,
        tasks : ['concat:collections'],
        options : {}
      },

      init : {
        files : files.src.init,
        tasks : ['concat:init'],
        options : {}
      },
    },
    concat : {
      options : {
        sourceMap : true
      },

      shared_vendor : {
        src : files.src.shared_vendor,
        dest : files.dest.shared_vendor
      },
      shared_constants : {
        src : files.src.shared_constants,
        dest : files.dest.shared_constants
      },
      shared_custom : {
        src : files.src.shared_custom,
        dest : files.dest.shared_custom
      },
      shared_components : {
        src : files.src.shared_components,
        dest : files.dest.shared_components
      },
      shared_containers : {
        src : files.src.shared_containers,
        dest : files.dest.shared_containers
      },
      shared_collections : {
        src : files.src.shared_collections,
        dest : files.dest.shared_collections
      },
      shared_main : {
        src : files.src.shared_main,
        dest : files.dest.shared_main
      },
      shared_init : {
        src : files.src.shared_init,
        dest : files.dest.shared_init
      },

      vendor : {
        src : files.src.vendor,
        dest : files.dest.vendor
      },
      constants : {
        src : files.src.constants,
        dest : files.dest.constants
      },
      components : {
        src : files.src.components,
        dest : files.dest.components
      },
      containers : {
        src : files.src.containers,
        dest : files.dest.containers
      },
      custom : {
        src : files.src.custom,
        dest : files.dest.custom
      },
      collections : {
        src : files.src.collections,
        dest : files.dest.collections
      },
      main : {
        src : files.src.main,
        dest : files.dest.main
      },
      init : {
        src : files.src.init,
        dest : files.dest.init
      }
    }
  }
};
