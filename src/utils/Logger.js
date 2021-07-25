import { createLogger, transports, format } from 'winston';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @description a simple application logger
 */
const Logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
    format.json(),
  ),
  transports: [
    new transports.File({
      filename: './logs/all-logs.log',
      json: false,
      maxsize: 5242880,
      maxFiles: 3,
      colorize: false
    }),
    new transports.File({
      filename: './logs/error-logs.log',
      json: true,
      maxsize: 5242880,
      maxFiles: 5,
      level: 'error',
      colorize: false,
    }),
  ],
});


Logger.stream = {
  write: (message) => Logger.info(message.substring(0, message.lastIndexOf('\n')))
};

export default Logger;
