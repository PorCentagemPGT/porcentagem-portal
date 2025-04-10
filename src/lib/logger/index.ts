import { createLogger, format, transports } from 'winston';
import { defaultLogConfig, LogConfig, logLevels } from './config';

class Logger {
  private static instance: Logger;
  private logger: ReturnType<typeof createLogger>;
  private config: LogConfig = defaultLogConfig;

  private constructor() {
    this.logger = this.createLogger();
  }

  private createLogger() {
    return createLogger({
      levels: logLevels,
      level: this.config.level,
      format: format.combine(
        format.timestamp(),
        format.json(),
      ),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ timestamp, level, message, ...meta }) => {
              const metaString = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
              return `${timestamp} [${level}]: ${message}${metaString}`;
            }),
          ),
        }),
      ],
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public configure(config: Partial<LogConfig>) {
    this.config = { ...this.config, ...config };
    this.logger = this.createLogger();
  }

  public error(message: string, meta?: object) {
    if (!this.config.enabled) return;
    this.logger.error(message, meta);
  }

  public warn(message: string, meta?: object) {
    if (!this.config.enabled) return;
    this.logger.warn(message, meta);
  }

  public info(message: string, meta?: object) {
    if (!this.config.enabled) return;
    this.logger.info(message, meta);
  }

  public http(message: string, meta?: object) {
    if (!this.config.enabled) return;
    this.logger.http(message, meta);
  }

  public debug(message: string, meta?: object) {
    if (!this.config.enabled) return;
    this.logger.debug(message, meta);
  }
}

export const logger = Logger.getInstance();
