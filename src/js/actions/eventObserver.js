class EventObserver {
  constructor() {
    this.observers = [];
  }

  subscribe(subscriber) {
    this.observers.push(subscriber);
  }

  unsubscribe(subscriber) {
    this.observers = this.observers.filter(sub => sub !== subscriber);
  }

  broadcast(data) {
    this.observers.forEach(subscriber => subscriber(data));
  }
}

export default EventObserver