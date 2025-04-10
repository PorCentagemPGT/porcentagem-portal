export const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
} as const;

export type LogLevel = keyof typeof logLevels;

export interface LogConfig {
  level: LogLevel;
  enabled: boolean;
}

export const defaultLogConfig: LogConfig = {
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  enabled: true,
};
