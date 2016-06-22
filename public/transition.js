(function () {
var FILTER_DELTA = {
  back : deltaBack,
  elastic : deltaElastic,
  linear : deltaLinear,
  quadratic : deltaQuadratic,
};

var FILTER_EASE = {
  'in' : easeIn,
  'in-out' : easeInOut,
  'out' : easeOut,
};
function Animate(self, callback) {
  this.method = {
    then : [],
    catch : []
  };
  this.options = self.options;
  this.callback = callback;
  this.iterations = 0;
}

Animate.prototype.then = function (callback) {
  this.method.then.push(callback);
};

Animate.prototype.start = function (time) {
  var self = this;
  var start = this.options.start;
  var end = this.options.end;
  var duration = self.options.duration;

  this.options.timer = setInterval(function () {
    var progress = Math.min((new Date() - time) / duration, 1);
    var result = {};

    // Set the frame
    forEach(self.options.start, function (value, key) {
      var delta = self.options.ease(self.options.delta, progress);
      var step = round(delta, 2);
      result[key] = start[key] + step * (end[key] - start[key]);
    });

    self.callback(result, progress);

    if (progress === 1) {
      self.iterations++;

      clearInterval(self.options.timer);

      if (self.options.iterations === self.iterations) {
        then(self);
      } else {
        self.start(new Date());
      }
    }
  }, self.options.fps);

  return this;
};

function deltaBack(p) {
  // This code was adapted from MooTools.FX.Transitions.
  var x = 10.618;
  return Math.pow(p, 2) * ((x + 1) * p - x);
}

function deltaBounce(p) {
  // The code is taken from MooTools.FX.Transitions.
  for (var a = 0, b = 1; 1; a += b, b /= 2) {
    if (p >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * p) / 4, 2) + Math.pow(b, 2);
    }
  }
}

function deltaElastic(p) {
  // This code was adapted from MooTools.FX.Transitions.
  return Math.pow(2, 15 * --p) * Math.cos(20 * p * Math.PI * 1 / 3);
}

deltaElastic.curry = function (a) {
  a = a * 5;
  return function (p) {
    return Math.pow(2, 15 * --p) * Math.cos(a * p * Math.PI * 1 / 3);
  };
};

function deltaLinear(p) {
  return p;
}

function deltaQuadratic(p) {
  return Math.pow(p, 5);
}

function easeInOut(transition, pos) {
  return (pos <= 0.5) ? transition(2 * pos) / 2 : (2 - transition(2 * (1 - pos))) / 2;
}

function easeIn(transition, pos) {
  return transition(pos);
}

function easeOut(transition, pos) {
  return 1 - transition(1 - pos);
}

(function () {
  var waiting = false;

  /*
    A function to ensure that the user has not chained two of the same method
    this is done because the last method call will overwrite every preceeding
    method with the same name with the exception of 'then'
    This error ensures the user is aware of the behavior.
  */

  function checkHistory(history) {
    var last = history.slice(-1)[0];
    var second = history.length > 1
      ? history.slice(-2)[0]
      : false;

    var boolean = ((
      // Ensure both values exist for the comparison
      last && second
    ) && (
      // Is not then
      last.method !== method_then
    ) && (
      // Check to see if the methods are identical
      last.method === second.method
    ));

    if (boolean) {
      throw 'Cannot chain two of the same method, unless that method is \'then\'';
    }
  }

  function flush(self) {
    var queue = self.queue;
    var result;

    if (!waiting && queue[0]) {
      result = queue[0].method.apply(self, queue[0].arguments);
      if (result && typeof result.then === 'function') {
        waiting = true;
        result.then(function () {
          waiting = false;
          queue.shift();
          flush(self);
        });
      } else {
        queue.shift();
        flush(self);
      }
    }

  }

  function enqueue(self, opt) {
    self.queue.push(opt);
    self.history.push(opt);
    checkHistory(self.history);
    flush(self);
  }

  window.enqueue = enqueue;
}());
window.transition = function transition(opt) {
  return new Transition(opt);
};

function method_start(callback) {
  return new Animate(this, callback).start(new Date());
}

function method_transition(options) {
  this.options = {
    start : options.start,
    end : options.end,

    delta : FILTER_DELTA[
      options.delta
      || 'quadratic'
    ],

    ease : FILTER_EASE[
      options.ease
      || 'in-out'
    ],

    iterations : options.iterations
      || 1,

    duration : options.duration
      || 300,

    fps : options.fps
      ? 1000 / options.fps
      : 10,
  };
}

function method_then(callback) {
  callback();
}

function Transition(opt) {
  this.queue = [];
  this.history = [];

  enqueue(this, {
    name : 'transition',
    method : method_transition,
    arguments : [ opt ]
  });
}

Transition.prototype.start = function (callback) {
  enqueue(this, {
    name : 'start',
    method : method_start,
    arguments : [ callback ]
  });
  return this;
};

Transition.prototype.transition = function (opt) {
  enqueue(this, {
    name : 'transition',
    method : method_transition,
    arguments : [ opt ]
  });
  return this;
};

Transition.prototype.then = function (callback) {
  enqueue(this, {
    name : 'then',
    method : method_then,
    arguments : [ callback ]
  });
  return this;
};

Transition.prototype.stop = function (callback) {
  this.queue = [];
  clearInterval(this.options.timer);
  return this;
};

Transition.ease = {
  in : easeIn,
  out : easeOut,
  inOut : easeInOut
};

Transition.delta = {
  linear : deltaLinear,
  quadratic : deltaQuadratic,
  bounce : deltaBounce,
  elastic : deltaElastic,
  back : deltaBack
};

function forEach(iterable, func_callback) {
  for (var k in iterable) if (func_callback(iterable[k], k) === false) return false;
}

function round(number, places) {
  return Math.round(number * Math.pow(10, places)) / Math.pow(10, places);
}

function then(self) {
  self.method.catch = [];
  whileType(self.method.then);
}

function whileType(method) {
  var n = arguments.length;
  var a = new Array(n);
  var i = 1;

  for (;i < n; i++) {
    a.push(arguments[i]);
  }

  while (method && method.length) {
    method[0].apply(a);
    method.shift();
  }
}
})();
//# sourceMappingURL=../public/transition.js.map
