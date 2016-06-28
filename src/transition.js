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
