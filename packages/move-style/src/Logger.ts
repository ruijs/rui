import { RuiLogger, RuiLoggerProvider, RuiLogLevelNames } from "@ruiapp/log";

export * from "@ruiapp/log";

export type RuiModulesNames =
  | "framework"
  | "page"
  | "scope"
  | "store"
  | "componentTreeManager"
  | "componentRenderer"
  | "componentEventHandler"
  | "expressionInterpreter"
  | "other";

export class RuiModuleLoggerFactory {
  #provider: RuiLoggerProvider;
  #loggers: Map<RuiModulesNames, RuiModuleLogger>;
  #rockLogger: RuiRockLogger;

  constructor() {
    this.#loggers = new Map();
  }

  setLoggerProvider(provider: RuiLoggerProvider) {
    this.#provider = provider;
  }

  getLogger(moduleName: RuiModulesNames) {
    let logger = this.#loggers.get(moduleName);
    if (!logger) {
      logger = new RuiModuleLogger(this.#provider, moduleName);
      this.#loggers.set(moduleName, logger);
    }
    return logger;
  }

  getRockLogger() {
    let logger = this.#rockLogger;
    if (!logger) {
      logger = new RuiRockLogger(this.#provider);
      this.#rockLogger = logger;
    }
    return logger;
  }
}

export class RuiModuleLogger {
  #logger: RuiLogger;
  #moduleName: RuiModulesNames;

  constructor(loggerProvider: RuiLoggerProvider, moduleName: RuiModulesNames) {
    if (loggerProvider) {
      this.#logger = loggerProvider.createLogger();
    }

    this.#moduleName = moduleName;
  }

  get level() {
    if (this.#logger) {
      return this.#logger.level;
    }
  }

  set level(value: RuiLogLevelNames) {
    if (this.#logger) {
      this.#logger.level = value;
    }
  }

  isLevelEnabled(level: RuiLogLevelNames): boolean {
    if (this.#logger) {
      return this.#logger.isLevelEnabled(level);
    }
    return false;
  }

  isEmergEnabled(): boolean {
    if (this.#logger) {
      return this.#logger.isEmergEnabled();
    }
    return false;
  }

  isCritEnabled(): boolean {
    if (this.#logger) {
      return this.#logger.isCritEnabled();
    }
    return false;
  }

  isErrorEnabled(): boolean {
    if (this.#logger) {
      return this.#logger.isErrorEnabled();
    }
    return false;
  }

  isWarnEnabled(): boolean {
    if (this.#logger) {
      return this.#logger.isWarnEnabled();
    }
    return false;
  }

  isInfoEnabled(): boolean {
    if (this.#logger) {
      return this.#logger.isInfoEnabled();
    }
    return false;
  }

  isDebugEnabled(): boolean {
    if (this.#logger) {
      return this.#logger.isDebugEnabled();
    }
    return false;
  }

  isVerboseEnabled(): boolean {
    if (this.#logger) {
      return this.#logger.isVerboseEnabled();
    }
    return false;
  }

  log(level: string, message: string, meta?: object) {
    if (!this.#logger) {
      return;
    }
    this.#logger.log(level, message, {
      ...meta,
      ruiModule: this.#moduleName,
    });
  }
  /**
   * The service/app is going to stop or become unusable now. An operator should definitely look into this immediately.
   */
  emerg(message: string, meta?: object) {
    if (!this.#logger) {
      return;
    }
    this.#logger.emerg(message, {
      ...meta,
      ruiModule: this.#moduleName,
    });
  }
  /**
   * Fatal for a particular service, but the app continues servicing other requests. An operator should look at this immediately.
   */
  crit(message: string, meta?: object) {
    if (!this.#logger) {
      return;
    }
    this.#logger.crit(message, {
      ...meta,
      ruiModule: this.#moduleName,
    });
  }
  /**
   * Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).
   */
  error(message: string, meta?: object) {
    if (!this.#logger) {
      return;
    }
    this.#logger.error(message, {
      ...meta,
      ruiModule: this.#moduleName,
    });
  }
  /**
   * A note on something that should probably be looked at by an operator eventually.
   */
  warn(message: string, meta?: object) {
    if (!this.#logger) {
      return;
    }
    this.#logger.warn(message, {
      ...meta,
      ruiModule: this.#moduleName,
    });
  }
  /**
   * Detail on regular operation.
   */
  info(message: string, meta?: object) {
    if (!this.#logger) {
      return;
    }
    this.#logger.info(message, {
      ...meta,
      ruiModule: this.#moduleName,
    });
  }
  /**
   * Anything else, i.e. too verbose to be included in "info" level.
   */
  debug(message: string, meta?: object) {
    if (!this.#logger) {
      return;
    }
    this.#logger.debug(message, {
      ...meta,
      ruiModule: this.#moduleName,
    });
  }
  /**
   * Logging from external libraries used by your app or very detailed application logging.
   */
  verbose(message: string, meta?: object) {
    if (!this.#logger) {
      return;
    }
    this.#logger.verbose(message, {
      ...meta,
      ruiModule: this.#moduleName,
    });
  }
}

export class RuiRockLogger {
  #logger: RuiLogger;

  // TODO: should pass rockProps in constructor
  constructor(loggerProvider: RuiLoggerProvider) {
    if (loggerProvider) {
      this.#logger = loggerProvider.createLogger();
    }
  }

  // TODO: should remove this
  getInternalLogger() {
    return this.#logger;
  }

  get level() {
    if (this.#logger) {
      return this.#logger.level;
    }
  }

  set level(value: RuiLogLevelNames) {
    if (this.#logger) {
      this.#logger.level = value;
    }
  }

  isLevelEnabled(level: RuiLogLevelNames): boolean {
    if (this.#logger) {
      return this.#logger.isLevelEnabled(level);
    }
    return false;
  }

  isEmergEnabled(): boolean {
    if (this.#logger) {
      return this.#logger.isEmergEnabled();
    }
    return false;
  }

  isCritEnabled(): boolean {
    if (this.#logger) {
      return this.#logger.isCritEnabled();
    }
    return false;
  }

  isErrorEnabled(): boolean {
    if (this.#logger) {
      return this.#logger.isErrorEnabled();
    }
    return false;
  }

  isWarnEnabled(): boolean {
    if (this.#logger) {
      return this.#logger.isWarnEnabled();
    }
    return false;
  }

  isInfoEnabled(): boolean {
    if (this.#logger) {
      return this.#logger.isInfoEnabled();
    }
    return false;
  }

  isDebugEnabled(): boolean {
    if (this.#logger) {
      return this.#logger.isDebugEnabled();
    }
    return false;
  }

  isVerboseEnabled(): boolean {
    if (this.#logger) {
      return this.#logger.isVerboseEnabled();
    }
    return false;
  }

  log(rockProps: object, level: string, message: string, meta?: object) {
    if (!this.#logger) {
      return;
    }
    this.#logger.log(level, message, {
      ...meta,
      rockProps,
    });
  }
  /**
   * The service/app is going to stop or become unusable now. An operator should definitely look into this immediately.
   */
  emerg(rockProps: object, message: string, meta?: object) {
    if (!this.#logger) {
      return;
    }
    this.#logger.emerg(message, {
      ...meta,
      rockProps,
    });
  }
  /**
   * Fatal for a particular service, but the app continues servicing other requests. An operator should look at this immediately.
   */
  crit(rockProps: object, message: string, meta?: object) {
    if (!this.#logger) {
      return;
    }
    this.#logger.crit(message, {
      ...meta,
      rockProps,
    });
  }
  /**
   * Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).
   */
  error(rockProps: object, message: string, meta?: object) {
    if (!this.#logger) {
      return;
    }
    this.#logger.error(message, {
      ...meta,
      rockProps,
    });
  }
  /**
   * A note on something that should probably be looked at by an operator eventually.
   */
  warn(rockProps: object, message: string, meta?: object) {
    if (!this.#logger) {
      return;
    }
    this.#logger.warn(message, {
      ...meta,
      rockProps,
    });
  }
  /**
   * Detail on regular operation.
   */
  info(rockProps: object, message: string, meta?: object) {
    if (!this.#logger) {
      return;
    }
    this.#logger.info(message, {
      ...meta,
      rockProps,
    });
  }
  /**
   * Anything else, i.e. too verbose to be included in "info" level.
   */
  debug(rockProps: object, message: string, meta?: object) {
    if (!this.#logger) {
      return;
    }
    this.#logger.debug(message, {
      ...meta,
      rockProps,
    });
  }
  /**
   * Logging from external libraries used by your app or very detailed application logging.
   */
  verbose(rockProps: object, message: string, meta?: object) {
    if (!this.#logger) {
      return;
    }
    this.#logger.verbose(message, {
      ...meta,
      rockProps,
    });
  }
}
