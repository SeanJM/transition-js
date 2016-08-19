# Transition.js

A lightweight library for animations in JavaScript. The library provides methods which are an interface for queuing animations to animate properties or Nodes.

## Changes

0.5.1 Refactored the code to be cleaner and use a `Promise` syntax
0.5.2 Made any animation able to mix in elasticity
0.5.3 Changed interface for setting start and end property values

## Basic Usage
#### A function which will animate to elements 'style.opacity' property.

```javascript
  var nodeA    = document.querySelector('#nodeA');
  var nodeB    = document.querySelector('#nodeB');

  transition({
    opacity : [0, 1]
  }).start(function (r) {
    nodeA.style.opacity = r.opacity;
    nodeB.style.opacity = r.opacity;
  }).then(function () {
    alert('animation complete');
  });
```

#### `.start`

`start` is the initializer function, without it, the animation will not execute. It is passed a callback with `2` arguments.
- The transformed object
- The current animation position, a number that ranges from `0` and `1`.

## The `then` callback

```javascript
  var nodeA    = document.querySelector('#nodeA');
  var nodeB    = document.querySelector('#nodeB');

  var settings = {
    opacity : [0, 1]
  };

  transition(settings).start(function (r) {
    nodeA.style.opacity = r.opacity;
    nodeB.style.opacity = r.opacity;
  }).then(function () {
    console.log('My animation is complete');
  });
```

## Using the queue with the `transition` method

```javascript
  var nodeA    = document.querySelector('#nodeA');
  var nodeB    = document.querySelector('#nodeB');

  var settings = {
    opacity : [0, 1]
  };

  function onComplete() {
    console.log('My animation is complete');
  }

  transition(animationSettings)
    .start(function (r) {
      nodeA.style.opacity = r.opacity;
    })
    .transition(animationSettings)
    .start(function (r) {
      nodeB.style.opacity = r.opacity;
    })
    .then(onComplete);
```

## Supported settings for animation

#### `settings.iteration`

Default value for `settings.iteration` is `1`, set to `0` for infinite.

#### `settings.delta`

Default value for `settings.delta` is `quadratic`.

Available delta's are:

- `linear`
- `quadratic`
- `bounce`
- `back`

#### `settings.ease`

Default value for `settings.ease` is `in-out`

Available easings are:

- `in`
- `out`
- `in-out`

#### `settings.duration`

Default value for `settings.duration` is `600` milliseconds.

#### `settings.delay`

Default value for `settings.delay` is `0` milliseconds.

#### `settings.elastic`

Default value for `settings.elastic` is `0`, the max value is `1`.

#### Example

```javascript
  var settings = {
    delay      : 300,
    duration   : 1000,
    iterations : 3,
    delta      : 'bounce',
    ease       : 'out',
    elastic    : 0.5,

    bottom : [200, 0]
  };
```
