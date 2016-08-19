function deltaBack(p) {
  // This code was adapted from MooTools.FX.Transitions.
  var x = 6;
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

function deltaLinear(p) {
  return p;
}

function deltaQuadratic(p) {
  return Math.pow(p, 6);
}
