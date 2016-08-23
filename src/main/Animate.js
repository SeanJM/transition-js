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

Animate.prototype.elastify = function (t) {
  // Adapted from anime, which took it from jQuery
  var
    m = this.options.elastic * 400,
    p = (1 - m / 1000),
    st1 = ((1 - t) / 1) - 1,
    s = p / ( 2 * Math.PI ) * Math.asin( 1 ),
    r = -( Math.pow( 2, 10 * st1 ) * Math.sin( ( st1 - s ) * ( 2 * Math.PI ) / p ) );
  if (t === 1 || t === 0) { return t; }
  return this.options.elastic === 0 ? t : 1-r;
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
        var delta = self.elastify(self.options.ease(self.options.delta, progress));
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
