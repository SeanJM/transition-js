var nodeA = document.querySelector('#nodeA');
var nodeB = document.querySelector('#nodeB');
var animationSettings = {
  iterations : 3,
  start      : {
    opacity : 0
  },
  end : {
    opacity : 1
  }
};
transition(animationSettings)
.start(nodeA, nodeB)
.then(animationSettings)
.start(nodeA)
.then(animationSettings)
.start(function (r) {
  nodeB.style.opacity = r.opacity;
})
.complete(function () {
  console.log('animation complete');
});
