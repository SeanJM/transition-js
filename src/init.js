var FILTER_DELTA = {
  back : deltaBack,
  bounce : deltaBounce,
  linear : deltaLinear,
  quadratic : deltaQuadratic,
};

var FILTER_EASE = {
  'in' : easeIn,
  'in-out' : easeInOut,
  'out' : easeOut,
};

var DEFAULT_PROPS = [
  'delta',
  'ease',
  'elastic',
  'iterations',
  'duration',
  'delay',
  'fps'
];
