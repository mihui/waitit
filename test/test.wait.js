var assert = require('assert');
const waitit = require('../index');

describe('Test Conditional Waiting', () => {
  it('Should be good', async () => {
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
      console.log(wait);
      assert.strictEqual(waitit.STATUS.COMPLETED, wait.code);
    }
    catch(error) {
      console.log(error);
      assert.strictEqual(waitit.STATUS.TIMEOUT, error.code);
    }
  });

  it('Should be timeout', async () => {
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
      assert.strictEqual(waitit.STATUS.COMPLETED, wait.code);
    }
    catch(error) {
      console.log(error);
      assert.strictEqual(waitit.STATUS.TIMEOUT, error.code);
    }
  });

  it('Should be cancelled', (done) => {
    let condition = false;
    waitit.start({
      check: () => {
        return condition;
      }
    }).then((wait) => {
      console.log(wait);
    }).catch(error => {
      console.log(error);
      assert.strictEqual(waitit.STATUS.CANCELLED, error.code);
      done();
    });
    // Force it to stop
    setTimeout(() => {
      waitit.stop();
    }, 1000);
  });

});

