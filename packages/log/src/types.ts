export type RuiLogLevelNames = "emerg" | "crit" | "error" | "warn" | "info" | "debug" | "verbose";

export interface RuiLogMethod {
  (level: string, message: string, meta?: object): void;
}

export interface RuiLeveledLogMethod {
  (message: string, meta?: object): void;
}

export interface RuiLogger {
  level?: RuiLogLevelNames;

  isLevelEnabled(level: RuiLogLevelNames): boolean;

  isEmergEnabled(): boolean;

  isCritEnabled(): boolean;

  isErrorEnabled(): boolean;

  isWarnEnabled(): boolean;

  isInfoEnabled(): boolean;

  isDebugEnabled(): boolean;

  isVerboseEnabled(): boolean;

  log: RuiLogMethod;
  /**
   * The service/app is going to stop or become unusable now. An operator should definitely look into this immediately.
   */
  emerg: RuiLeveledLogMethod;
  /**
   * Fatal for a particular service, but the app continues servicing other requests. An operator should look at this immediately.
   */
  crit: RuiLeveledLogMethod;
  /**
   * Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).
   */
  error: RuiLeveledLogMethod;
  /**
   * A note on something that should probably be looked at by an operator eventually.
   */
  warn: RuiLeveledLogMethod;
  /**
   * Detail on regular operation.
   */
  info: RuiLeveledLogMethod;
  /**
   * Anything else, i.e. too verbose to be included in "info" level.
   */
  debug: RuiLeveledLogMethod;
  /**
   * Logging from external libraries used by your app or very detailed application logging.
   */
  verbose: RuiLeveledLogMethod;
}

export interface RuiLoggerProvider {
  createLogger(): RuiLogger;
}

export const logLevels = {
  /**
   * The service/app is going to stop or become unusable now. An operator should definitely look into this immediately.
   */
  emerg: 1,
  /**
   * Fatal for a particular service, but the app continues servicing other requests. An operator should look at this immediately.
   */
  crit: 2,
  /**
   * Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).
   */
  error: 3,
  /**
   * A note on something that should probably be looked at by an operator eventually.
   */
  warn: 4,
  /**
   * Detail on regular operation.
   */
  info: 5,
  /**
   * Anything else, i.e. too verbose to be included in "info" level.
   */
  debug: 6,
  /**
   * Logging from external libraries used by your app or very detailed application logging.
   */
  verbose: 7,
};
