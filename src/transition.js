/**
* A transition function which can handle a queue of animations
* Copyright (C) 2015 MooTools & Sean J. MacIsaac
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*
* Contact: seanjmacisaac@gmail.com
*/

function transition() {
  var queue      = [];
  var properties = {};
  var animationTimer;
  var transitionFunction;

  function assign(a, b) {
    for (var k in b) {
      a[k] = b[k];
    }
    return a;
  }

  function keys(a) {
    var list = [];
    for (var k in a) {
      list.push(k);
    }
    return list;
  }

  function processQueue() {
    var a;
    while (queue.length) {
      a = queue[0];
      queue[a.type].apply(null, a.arguments);
      queue.shift();
      if (a.type === 'startAnimation') {
        return false;
      }
    }
  }

  function pushQueue(type, arguments) {
    queue.push({
      type      : type,
      arguments : [].slice.call(arguments)
    });
  }

  function trasitionNode(result, progress, nodeList) {
    var resultFunction;
    for (var i = 0, n = nodeList.length; i < n; i++) {
      for (var k in result) {
        nodeList[i].style[k] = result[k];
      }
    }
  }

  function step(key, progress) {
    var selfDelta = properties.ease(properties.delta, progress);
    var start     = properties.start[key];
    var end       = properties.end[key];
    return start + selfDelta * (end - start);
  }

  function setFrame(progress) {
    var result = {};
    for (var key in properties.start) {
      result[key] = step(key, progress);
    }
    transitionFunction(result, progress);
  }

  function beginAnimation(startTime, iteration) {
    animationTimer = setInterval(function () {
      var timePassed = new Date() - startTime;
      var progress   = timePassed / properties.duration;
      if (progress > 1) {
        progress = 1;
      }
      setFrame(progress);
      if (progress === 1) {
        iteration += 1;
        clearInterval(animationTimer);
        if (properties.iterations === iteration) {
          processQueue();
        } else {
          beginAnimation(new Date(), iteration);
        }
      }
    }, 1000 / 100);
  }

  function init() {
    var self  = {
      start : function () {
        pushQueue('startAnimation', arguments);
        if (typeof animationTimer === 'undefined') {
          processQueue();
        }
        return self;
      },
      then : function () {
        pushQueue('setAnimationProperties', arguments);
        return self
      },
      complete : function () {
        pushQueue('endAnimationCallback', arguments);
        return self;
      },
      stop : function () {
        clearInterval(animationTimer);
      },
    };
    queue.push({
      type      : 'setAnimationProperties',
      arguments : [].slice.call(arguments)
    });
    return self;
  }

  queue.setAnimationProperties = function (_properties_) {
    properties = assign({
      duration   : 600,
      delay      : 0,
      delta      : transition.delta.quadratic,
      ease       : transition.ease.inOut,
      iterations : 1
    }, _properties_);
  };

  queue.startAnimation = function () {
    var nodeList = [].slice.call(arguments);
    if (typeof arguments[0] === 'function') {
      transitionFunction = arguments[0];
    } else {
      transitionFunction = function (result, progress) {
        trasitionNode(result, progress, nodeList);
      };
    }
    animationTimer = setTimeout(function () {
      beginAnimation(new Date(), 0);
    }, properties.delay);
  };

  queue.endAnimationCallback = function (callback) {
    callback();
  };

  return init.apply(null, arguments);
}

transition.delta = {
  linear : function (p) {
    return p;
  },
  quadratic : function (p) {
    return Math.pow(p, 5);
  },
  bounce : function (p) {
    // The code is taken from MooTools.FX.Transitions.
    for (var a = 0, b = 1; 1; a += b, b /= 2) {
      if (p >= (7 - 4 * a) / 11) {
        return -Math.pow((11 - 6 * a - 11 * p) / 4, 2) + Math.pow(b, 2);
      }
    }
  },
  elastic : function (p) {
    // This code was adapted from MooTools.FX.Transitions.
    return Math.pow(2, 15 * --p) * Math.cos(15 * p * Math.PI * 1 / 3);
  },
  back : function (p) {
    // This code was adapted from MooTools.FX.Transitions.
    var x = 10.618;
    return Math.pow(p, 2) * ((x + 1) * p - x);
  }
};

transition.ease = {
  in : function (deltaFn, progress) {
    return deltaFn(progress);
  },
  out : function (deltaFn, progress) {
    return 1 - deltaFn(1 - progress);
  },
  inOut : function (deltaFn, progress) {
    if (progress < 0.5) {
      return deltaFn(2 * progress) / 2;
    } else {
      return (2 - deltaFn(2 * (1 - progress))) / 2;
    }
  }
};
