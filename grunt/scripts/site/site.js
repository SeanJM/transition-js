const fs = require('fs');
const files = require('./files');
const config = JSON.parse(fs.readFileSync('package.json'));
const dest = files.dest[ config.isProduction ? 'production' : 'development' ];

let task = {
  concat : {
    options : {
      sourceMap : false
    }
  },
  watch : {}
};

task.uglify = {
  options : {
    mangle : true
  },
  files : {
    src : files.list,
    dest : config.scripts && config.scripts.bundle
     ? config.scripts.bundle
     : 'bin/bundle.min.js'
  }
};

for (var k in files.src) {
  if (files.src[k].length) {
    task.concat[k] = {
      src : files.src[k],
      dest : dest[k]
    };

    task.watch[k] = {
      files : files.src[k],
      task : [ 'concat:' + k ]
    };
  }
}

module.exports = {
  files : files.list,
  dest : dest,

  task : {
    concat : {
      options : {
        sourceMap : true
      },

      shared_vendor : {
        src : files.src.shared_vendor,
        dest : dest.shared_vendor
      },
      shared_constants : {
        src : files.src.shared_constants,
        dest : dest.shared_constants
      },
      shared_custom : {
        src : files.src.shared_custom,
        dest : dest.shared_custom
      },
      shared_components : {
        src : files.src.shared_components,
        dest : dest.shared_components
      },
      shared_containers : {
        src : files.src.shared_containers,
        dest : dest.shared_containers
      },
      shared_collections : {
        src : files.src.shared_collections,
        dest : dest.shared_collections
      },
      shared_main : {
        src : files.src.shared_main,
        dest : dest.shared_main
      },
      shared_init : {
        src : files.src.shared_init,
        dest : dest.shared_init
      },

      vendor : {
        src : files.src.vendor,
        dest : dest.vendor
      },
      constants : {
        src : files.src.constants,
        dest : dest.constants
      },
      components : {
        src : files.src.components,
        dest : dest.components
      },
      containers : {
        src : files.src.containers,
        dest : dest.containers
      },
      custom : {
        src : files.src.custom,
        dest : dest.custom
      },
      collections : {
        src : files.src.collections,
        dest : dest.collections
      },
      main : {
        src : files.src.main,
        dest : dest.main
      },
      init : {
        src : files.src.init,
        dest : dest.init
      }
    }
  }
};

// production
module.exports = {
  group : files.group,
  src : files.list,
  dest : dest,

  task : {
    options : {
      sourceMap : false
    },

    bundle : {
      src : files.list,
      dest : 'bundle.min.js'
    }
  }
};
