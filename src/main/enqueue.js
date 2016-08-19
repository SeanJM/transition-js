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
