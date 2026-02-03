/**
 * A custom error class that extends the built-in Error class.
 * It adds a code property to the standard Error for more specific error handling.
 */
class CustomError extends Error {
  /** @type {number} Error code */
  code;
  /** @type {string} Error name */
  name;
  /**
   * Creates a new CustomError instance.
   * @param {string|number} code - The error code to associate with this error.
   * @param {string} [message=''] - The error message. Defaults to an empty string if not provided.
   */
  constructor(code, message = '') {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}

/**
 * Wait until it matches a given condition
 */
const waitit = {
  STATUS: {
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
    TIMEOUT: 'TIMEOUT'
  },
  CANCEL: false,
  DEBUG: false,
  /**
   * Start waiting for the condition or timeout
   * 
   * @param {object} options Options
   * 
   *  - check: method to check the given condition
   *  - interval: default: 1000 (1 second)
   *  - maxTicks: how many times to check before timeout, default 10 (equals to 10 seconds with default interval)
   *  - tick: callback of the ticks
   * @returns {Promise<{ code: string }>}
   */
  start: (options) => {
    let t = 0;
    let ticks = 0;
    options.interval = options.interval || 1000;
    options.maxTicks = options.maxTicks || 10;
    options.check = options.check || (() => { return true });
    options.tick = options.tick || ((tick) => {
      if (waitit.DEBUG) console.log(`[Wait it]: ${tick}`);
    });

    return new Promise((resolve, reject) => {
      t = setInterval(() => {
        // Check for cancellation
        if (waitit.CANCEL) {
          clearInterval(t);
          waitit.CANCEL = false; // Reset flag for future use
          reject(new CustomError(waitit.STATUS.CANCELLED));
          return;
        }
        
        // Execute tick callback
        options.tick(ticks);
        
        // Check condition
        if (options.check()) { 
          clearInterval(t);
          resolve({ code: waitit.STATUS.COMPLETED });
        }
        // Check for timeout (fixed: use >= instead of > to match maxTicks exactly)
        else if (ticks >= options.maxTicks) {
          clearInterval(t);
          reject(new CustomError(waitit.STATUS.TIMEOUT));
        }
        
        // Increment tick counter after checks
        ticks++;
      }, options.interval);
    });
  },
  stop: () => {
    waitit.CANCEL = true;
  }
};

module.exports = waitit;
