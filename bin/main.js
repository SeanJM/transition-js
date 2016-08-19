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

Animate.prototype.elastify = function (p, _p) {
  var pos = 1 - Math.pow(_p, 6);
  var y = 1 - Math.pow(2, 15 * --pos) * Math.cos(50 * pos * Math.PI * 1 / 2);
  return mix(p, y, this.options.elastic);
};

Animate.prototype.start = function () {
  var self = this;
  var start = this.options.start;
  var end = this.options.end;
  var duration = this.options.duration;
  var delay = this.options.delay;
  var result = {};
  var progress;
  var time;

  setTimeout(function () {
    self.options.timer = setInterval(function () {
      time = time || new Date();
      progress = Math.min((new Date() - time) / duration, 1);

      // Set the frame
      forEach(start, function (value, key) {
        var delta = self.elastify(self.options.ease(self.options.delta, progress), progress);
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
          self.start();
        }
      }
    }, self.options.fps);
  }, delay);

  return this;
};

function deltaBack(p) {
  // This code was adapted from MooTools.FX.Transitions.
  var x = 6;
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

function deltaLinear(p) {
  return p;
}

function deltaQuadratic(p) {
  return Math.pow(p, 6);
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

  function next(self) {
    var queue = self.queue;
    var result;

    if (!self.waiting && queue[0]) {
      result = queue[0].method.apply(self, queue[0].arguments);
      if (result && typeof result.then === 'function') {
        self.waiting = true;
        result.then(function () {
          self.waiting = false;
          queue.shift();
          next(self);
        });
      } else {
        queue.shift();
        next(self);
      }
    }

  }

  function enqueue(self, opt) {
    self.queue.push(opt);
    self.history.push(opt);
    checkHistory(self.history);
    next(self);
  }

  window.enqueue = enqueue;
}());

window.transition = function transition(opt) {
  return new Transition(opt);
};

function method_start(callback) {
  return new Animate(this, callback).start();
}

function method_transition(options) {
  var start = {};
  var end = {};

  var FILTER_DELTA = {
    back : deltaBack,
    bounce : deltaBounce,
    linear : deltaLinear,
    quadratic : deltaQuadratic,
  };

  var FILTER_EASE = {
    'in' : easeIn,
    'in-out' : easeInOut,
    'out' : easeOut,
  };

  for (var k in options) {
    if (DEFAULT_PROPS.indexOf(k) === -1) {
      start[k] = options[k][0];
      end[k] = options[k][1];
    }
  }

  this.options = {
    start : start,
    end : end,

    delta : FILTER_DELTA[options.delta]
      || FILTER_DELTA.quadratic,

    ease : FILTER_EASE[options.ease]
      || FILTER_EASE['in-out'],

    elastic : options.elastic
      || 0,

    iterations : typeof options.iterations === 'number'
      ? options.iterations
      : 1,

    duration : options.duration
      || 300,

    delay : options.delay
      || 0,

    fps : options.fps
      ? 1000 / options.fps
      : 10,
  };
}

function method_then(callback) {
  if (typeof callback === 'function') {
    callback();
  }
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
  back : deltaBack
};