// Import dependencies
const EventEmitter = require('events');
const uuid = require('uuid').v4;
const debounce = require('lodash.debounce');
const throttle = require('lodash.throttle');
const debug = require('debug')('micro-event-bus');
const validate = require('validate.js');
const colors = require('colors');

// Validation constraints
const eventConstraints = {
  name: {
    presence: true,
    type: "string"
  }
};

class MicroEventBus extends EventEmitter {
  constructor() {
    super();
    debug(colors.green('MicroEventBus initialized'));
  }

  emitEvent(eventName, data) {
    const validation = validate({name: eventName}, eventConstraints);
    if (validation) {
      debug(colors.red(`Validation error: ${validation.name[0]}`));
      return;
    }

    this.emit(eventName, data);
    debug(colors.blue(`Event ${eventName} emitted`));
  }

  registerEvent(eventName, listener, options = {}) {
    const validation = validate({name: eventName}, eventConstraints);
    if (validation) {
      debug(colors.red(`Validation error: ${validation.name[0]}`));
      return;
    }

    const listenerId = uuid();
    const wrappedListener = options.debounce ? debounce(listener, options.debounce) :
      options.throttle ? throttle(listener, options.throttle) :
        listener;

    this.on(eventName, wrappedListener);
    debug(colors.yellow(`Listener ${listenerId} registered for event ${eventName}`));

    return listenerId;
  }

  unregisterEvent(listenerId) {
    // For demonstration purposes, assumes listeners are tracked externally with their IDs
    debug(colors.magenta(`Listener ${listenerId} unregistered`));
    // Implement listener tracking and removal logic here
  }
}

module.exports = MicroEventBus;
