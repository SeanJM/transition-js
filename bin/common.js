function forEach(iterable, func_callback) {
  for (var k in iterable) if (func_callback(iterable[k], k) === false) return false;
}

function mix(a, b, p) {
	return a + ((b - a) * p);
}

function round(number, places) {
  return Math.round(number * Math.pow(10, places)) / Math.pow(10, places);
}

function then(self) {
  self.method.catch = [];
  whileType(self.method.then);
}

// A function to loop through an array of functions, executing each function
// then removing it from the array

function whileType(method) {
  var n = arguments.length;
  var a = new Array(n);
  var i = 1;

  for (;i < n; i++) {
    a.push(arguments[i]);
  }

  while (method && method.length) {
    method[0].apply(a);
    method.shift();
  }
}
