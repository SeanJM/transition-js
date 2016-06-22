function forEach(iterable, func_callback) {
  for (var k in iterable) if (func_callback(iterable[k], k) === false) return false;
}
