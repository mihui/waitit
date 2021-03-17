/**
 * Wait until it matches a given condition
 */
const waitit = {
  STATUS: {
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
    TIMEOUT: 'TIMEOUT'
  },
  cancel: false,
  /**
   * Start waiting for the condition or timeout
   * 
   * @param {object} options Options
   * 
   *  - check: check for the given condition
   *  - interval: default: 100 (0.1 second)
   *  - maxTicks: how many times of check it will be timeout, default 100 (equals to 10 seconds)
   * @returns 
   */
  start: (options) => {
    let t = 0;
    let ticks = 0;
    options.interval = options.interval || 1000;
    options.maxTicks = options.maxTicks || 10;
    options.check = options.check || (() => { return true });
    options.tick = options.tick || ((tick) => {
      console.log(tick);
    });

    return new Promise((resolve, reject) => {
      t = setInterval(() => {
        // Cancel
        if(waitit.cancel) {
          clearInterval(t);
          reject({ code: waitit.STATUS.CANCELLED });
        }
        console.log(ticks);
        // Check condition
        if(options.check()) { 
          clearInterval(t);
          resolve({ code: waitit.STATUS.COMPLETED });
        }
        else if(ticks++ > options.maxTicks) {
          clearInterval(t);
          reject({ code: waitit.STATUS.TIMEOUT });
        }
      }, options.interval);
    });
  },
  stop: () => {
    waitit.cancel = true;
  }
};

module.exports = waitit;