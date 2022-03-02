# Wait it for JavaScript

Wait until a condition matched.

## Usage

It shows you how to install the package, and how to use it from your projects.

### Installation

```bash
npm install waitit
```

### Samples

#### Wait for completion, e.g. 5 ticks

```javascript
let condition = false;
setTimeout(() => {
  condition = true;
}, 1);

try {
  const wait = await waitit.start({
    check: () => {
      return condition;
    },
    maxTicks: 5
  });
  console.log(wait); // { code: 'COMPLETED' }
}
catch(error) {
  console.log(error);
}
```

#### Timeout example

```javascript
let condition = false;
setTimeout(() => {
  condition = true;
}, 10000);
try {
  const wait = await waitit.start({
    check: () => {
      return condition;
    },
    maxTicks: 3
  });
  console.log(wait);
}
catch(error) {
  console.log(error);  // { code: 'TIMEOUT' }
}
```

#### Cancellation

```javascript
let condition = false;

waitit.start({
  check: () => {
    return condition;
  }
}).then((wait) => {
  console.log(wait);
}).catch(error => {
  console.log(error); // { code: 'CANCELLED' }
});
// Force it to stop
setTimeout(() => {
  waitit.stop();
}, 1000);

```
