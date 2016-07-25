function method_start(callback) {
  return new Animate(this, callback).start();
}

function method_transition(options) {
  this.options = {
    start : options.start,
    end : options.end,

    delta : FILTER_DELTA[options.delta]
      || FILTER_DELTA.quadratic,

    ease : FILTER_EASE[options.ease]
      || FILTER_EASE['in-out'],

    elastic : options.elastic
      || 0,

    iterations : options.iterations
      || 1,

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
