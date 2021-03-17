# Wait it for JavaScript

Wait until a condition matched.

## Usage

It shows you how to install the package, and how to use it from your projects.

### Installation

```bash
npm install waitit
```

### Samples

#### Wait for the condition

```javascript

let condition = false;

// Simulate when the condition is matched
setTimeout(() => {
  condition = true;
}, 3000);

try {
  const wait = await waitit.start({
    check: () => {
      return condition;
    }
  });
  console.log(wait);
}
catch(error) {
  console.log(error);
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
  console.log(error);
});
// Force it to stop
setTimeout(() => {
  waitit.stop();
}, 1000);

```
