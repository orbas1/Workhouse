export default class ActionQueue {
  constructor() {
    this.queue = Promise.resolve();
  }

  enqueue(action) {
    this.queue = this.queue.then(() => action()).catch((err) => {
      console.error('ActionQueue error', err);
    });
    return this.queue;
  }
}
