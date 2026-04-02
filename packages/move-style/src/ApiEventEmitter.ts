import Emitter from "events";

export const EVENT_NAMES = {
  API_UNAUTHORIZED: "API_UNAUTHORIZED",
  API_NOT_PERMISSION_ERROR: "API_NOT_PERMISSION_ERROR",
  API_ERROR: "API_ERROR",
} as const;

type EventKeys = (typeof EVENT_NAMES)[keyof typeof EVENT_NAMES];

type EventMap = {
  [K in EventKeys]: (error?: any) => void;
};

type EventName = keyof EventMap;

type Listener<T extends EventName> = EventMap[T];

class ApiEventEmitter {
  #emitter: Emitter;

  constructor() {
    this.#emitter = new Emitter();
  }

  /**
   * Register an event listener
   * @param eventName - The name of the event to listen to
   * @param listener - The callback function to invoke when the event is emitted
   * @returns This emitter instance for chaining
   */
  on<T extends EventName>(eventName: T, listener: Listener<T>): this {
    this.#emitter.on(eventName, listener);
    return this;
  }

  /**
   * Register a one-time event listener
   * @param eventName - The name of the event to listen to
   * @param listener - The callback function to invoke when the event is emitted
   * @returns This emitter instance for chaining
   */
  once<T extends EventName>(eventName: T, listener: Listener<T>): this {
    this.#emitter.once(eventName, listener);
    return this;
  }

  /**
   * Remove an event listener
   * @param eventName - The name of the event to remove the listener from
   * @param listener - The callback function to remove
   * @returns This emitter instance for chaining
   */
  off<T extends EventName>(eventName: T, listener: Listener<T>): this {
    this.#emitter.off(eventName, listener);
    return this;
  }

  /**
   * Emit an event with optional arguments
   * @param eventName - The name of the event to emit
   * @param args - Arguments to pass to the listeners
   * @returns true if the event had listeners, false otherwise
   */
  emit<T extends EventName>(eventName: T, ...args: Parameters<EventMap[T]>): boolean {
    return this.#emitter.emit(eventName, ...args);
  }

  /**
   * Remove all listeners for a specific event or all events
   * @param eventName - The name of the event to remove all listeners from (optional)
   * @returns This emitter instance for chaining
   */
  removeAllListeners(eventName?: EventName): this {
    this.#emitter.removeAllListeners(eventName);
    return this;
  }

  /**
   * Get the number of listeners for a specific event
   * @param eventName - The name of the event
   * @returns The number of listeners
   */
  listenerCount(eventName: EventName): number {
    return this.#emitter.listenerCount(eventName);
  }

  /**
   * Get all event names that have listeners
   * @returns An array of event names
   */
  eventNames(): string[] {
    return this.#emitter.eventNames();
  }

  /**
   * Get the maximum number of listeners for this emitter
   * @returns The maximum number of listeners
   */
  getMaxListeners(): number {
    return this.#emitter.getMaxListeners();
  }

  /**
   * Set the maximum number of listeners for this emitter
   * @param n - The maximum number of listeners
   * @returns This emitter instance for chaining
   */
  setMaxListeners(n: number): this {
    this.#emitter.setMaxListeners(n);
    return this;
  }

  /**
   * Check if there are any listeners for a specific event
   * @param eventName - The name of the event to check
   * @returns true if there are listeners, false otherwise
   */
  hasListeners(eventName: EventName): boolean {
    return this.listenerCount(eventName) > 0;
  }
}

const apiEventEmitter = new ApiEventEmitter();

export { apiEventEmitter };
