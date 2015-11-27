# Transition.js

A lightweight library for animations in JavaScript. The library provides methods which are an interface for queuing animations to animate properties or Nodes.

## Basic Usage
#### A function which will animate to elements 'style.opacity' property.

```javascript
  var nodeA    = document.querySelector('#nodeA');
  var nodeB    = document.querySelector('#nodeB');
  var settings = {
    start      : {
      opacity : 0
    },
    end : {
      opacity : 1
    }
  };
  transition(settings).start(nodeA, nodeB);
```

## The `complete` callback

```javascript
  var nodeA    = document.querySelector('#nodeA');
  var nodeB    = document.querySelector('#nodeB');
  var settings = {
    start      : {
      opacity : 0
    },
    end : {
      opacity : 1
    }
  };
  function onComplete() {
    console.log('My animation is complete');
  }
  transition(settings).start(nodeA, nodeB).complete(onComplete);
```

## Using the queue with the `then` method

```javascript
  var nodeA    = document.querySelector('#nodeA');
  var nodeB    = document.querySelector('#nodeB');
  var settings = {
    start      : {
      opacity : 0
    },
    end : {
      opacity : 1
    }
  };
  function onComplete() {
    console.log('My animation is complete');
  }
  transition(animationSettings)
  .start(nodeA, nodeB)
  .then(animationSettings)
  .start(nodeA)
  .then(animationSettings)
  .start(nodeB)
  .complete(onComplete);
```

## Valid arguments for `.start`

Start can take a list of `Nodes` as coma separated arguments or a `function`

Node List

```javascript
  var nodeA    = document.querySelector('#nodeA');
  var settings = {
    start      : {
      opacity : 0
    },
    end : {
      opacity : 1
    }
  };
  transition(settings).start(nodeA);
```

Using a function

```javascript
  var settings = {
    start      : {
      scrollY : window.scrollY
    },
    end : {
      scrollY : window.scrollY + 300
    }
  };
  transition(settings).start(function (transformed, progress) {
    window.scroll(0, transformed.scrollY);
  });
```

#### `transformed`

`transformed` is an object with the transformed values. In this case it would return `{ scrollY : value }`

#### `progress`

`progress` is a float between 0 and 100

## Supported settings for animation

#### `settings.iteration`

Default value for `settings.iteration` is `1`, set to `0` for infinite.

#### `settings.delta`

Default value for `settings.delta` is `transition.delta.quadratic`.

Available delta's are:

- `transition.delta.linear`
- `transition.delta.quadratic`
- `transition.delta.bounce`
- `transition.delta.elastic`
- `transition.delta.back`

#### `settings.duration`

Default value for `settings.duration` is `600` milliseconds.

#### `settings.delay`

Default value for `settings.delay` is `0` milliseconds.

#### Example

```javascript
  var settings = {
    delay      : 300,
    duration   : 1000,
    iterations : 3,
    delta      : transition.delta.bounce,
    ease       : transition.ease.out,
    start      : {
      bottom : 200
    },
    end : {
      bottom : 0
    }
  };
```
