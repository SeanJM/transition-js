function easeInOut(transition, pos) {
  return (pos <= 0.5) ? transition(2 * pos) / 2 : (2 - transition(2 * (1 - pos))) / 2;
}

function easeIn(transition, pos) {
  return transition(pos);
}

function easeOut(transition, pos) {
  return 1 - transition(1 - pos);
}
