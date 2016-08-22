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
  var pos = 1 - Math.pow(_p, 8);
  var y = 1 - Math.pow(2, 33 * --pos) * Math.cos(70 * pos * Math.PI * 1 / 5);
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
