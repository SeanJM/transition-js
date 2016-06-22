function deltaBack(p) {
  // This code was adapted from MooTools.FX.Transitions.
  var x = 10.618;
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

function deltaElastic(p) {
  // This code was adapted from MooTools.FX.Transitions.
  return Math.pow(2, 15 * --p) * Math.cos(20 * p * Math.PI * 1 / 3);
}

deltaElastic.curry = function (a) {
  a = a * 5;
  return function (p) {
    return Math.pow(2, 15 * --p) * Math.cos(a * p * Math.PI * 1 / 3);
  };
};

function deltaLinear(p) {
  return p;
}

function deltaQuadratic(p) {
  return Math.pow(p, 5);
}
