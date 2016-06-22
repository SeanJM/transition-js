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
