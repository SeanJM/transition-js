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
