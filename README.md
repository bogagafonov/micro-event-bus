# micro-event-bus

A minimal event bus for cross-component communication in JavaScript apps, making it easier to manage events across different parts of your application without tightly coupling components.

## Installation

To install `micro-event-bus`, run the following command in your project directory:

```bash
npm install micro-event-bus
```

## Usage

### Importing the Library

First, import `micro-event-bus` into your project:

```javascript
const MicroEventBus = require('micro-event-bus');
```

### Creating an Event Bus Instance

Create an instance of the event bus:

```javascript
const eventBus = new MicroEventBus();
```

### Emitting Events

To emit an event, use the `emitEvent` method:

```javascript
eventBus.emitEvent('my-event', { data: 'Example data' });
```

### Registering Event Listeners

Register an event listener with the `registerEvent` method:

```javascript
const listenerId = eventBus.registerEvent('my-event', (data) => {
console.log(`Received event data: \${data}`);
});
```

Optionally, you can debounce or throttle the listener by providing options:

```javascript
const debouncedListenerId = eventBus.registerEvent('my-event', (data) => {
console.log(`Debounced event data: \${data}`);
}, { debounce: 200 });

const throttledListenerId = eventBus.registerEvent('my-event', (data) => {
console.log(`Throttled event data: \${data}`);
}, { throttle: 100 });
```

### Unregistering Event Listeners

To unregister an event listener, you'll need to implement a mechanism to track and remove listeners based on their IDs:

```javascript
eventBus.unregisterEvent(listenerId);
```

## Contributing

Contributions to `micro-event-bus` are welcome! Please follow the standard GitHub pull request workflow. Ensure that your code adheres to the existing style, and all tests pass before submitting a pull request.

## License

`micro-event-bus` is licensed under the ISC license. See the LICENSE file for more details.
