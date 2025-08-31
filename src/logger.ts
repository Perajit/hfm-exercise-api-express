import { createLogger, transports, LoggerOptions } from 'winston';

const loggerOptions: LoggerOptions = {
  exitOnError: false,
  transports: [new transports.Console()],
};

export const logger = createLogger(loggerOptions);

