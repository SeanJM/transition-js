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
