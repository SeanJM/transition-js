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

Animate.prototype.elastify = function (p) {
  var a = this.options.elastic * 5;
  return this.options.elastic !== 0
    ? Math.pow(2, 15 * --p) * Math.cos(a * p * Math.PI * 1 / 3)
    : p;
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
        self.start(new Date());
      }
    }
  }, self.options.fps);

  return this;
};
