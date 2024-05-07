import Emitter from 'events';

export class EventEmitter {
  #emitter: Emitter;
  constructor() {
    this.#emitter = new Emitter();
  }

  on(eventName: string, listener: (...args: any) => void) {
    this.#emitter.on(eventName, listener);
  }

  emit(eventName: string, ...args: any) {
    this.#emitter.emit(eventName, ...args);
  }
}
