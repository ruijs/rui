import { logLevels, RuiLeveledLogMethod, RuiLogger, RuiLogLevelNames } from "./types";

export class RuiConsoleLogger implements RuiLogger {
  level?: RuiLogLevelNames;

  isLevelEnabled(level: RuiLogLevelNames) {
    const priorityOfTestedLevel = logLevels[level] || 0;
    const priorityOfEnabledLevel = logLevels[this.level || "info"];
    return priorityOfTestedLevel <= priorityOfEnabledLevel;
  }

  isEmergEnabled() {
    return this.isLevelEnabled("emerg");
  }

  isCritEnabled() {
    return this.isLevelEnabled("crit");
  }

  isErrorEnabled() {
    return this.isLevelEnabled("error");
  }

  isWarnEnabled() {
    return this.isLevelEnabled("warn");
  }

  isInfoEnabled() {
    return this.isLevelEnabled("info");
  }

  isDebugEnabled() {
    return this.isLevelEnabled("debug");
  }

  isVerboseEnabled() {
    return this.isLevelEnabled("verbose");
  }

  log(level: string, message: string, meta?: object) {
    ((this as any)[level] as RuiLeveledLogMethod)(message, meta);
  }

  emerg(message: string, meta?: object) {
    if (this.isLevelEnabled("emerg")) {
      console.error(message, meta);
    }
  }

  crit(message: string, meta?: object) {
    if (this.isLevelEnabled("crit")) {
      console.error(message, meta);
    }
  }

  error(message: string, meta?: object) {
    if (this.isLevelEnabled("error")) {
      console.error(message, meta);
    }
  }

  warn(message: string, meta?: object) {
    if (this.isLevelEnabled("warn")) {
      console.warn(message, meta);
    }
  }

  info(message: string, meta?: object) {
    if (this.isLevelEnabled("info")) {
      console.info(message, meta);
    }
  }

  debug(message: string, meta?: object) {
    if (this.isLevelEnabled("debug")) {
      console.debug(message, meta);
    }
  }

  verbose(message: string, meta?: object) {
    if (this.isLevelEnabled("verbose")) {
      console.debug(message, meta);
    }
  }
}
