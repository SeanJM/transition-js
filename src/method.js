function method_start(callback) {
  return new Animate(this, callback).start();
}

function method_transition(options) {
  var start = {};
  var end = {};

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
