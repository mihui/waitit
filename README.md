# Wait it for JavaScript

Wait until a condition matched.

## Usage

It shows you how to install the package, and how to use it from your projects.

### Installation

```bash
npm install waitit
```

### Sample

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
