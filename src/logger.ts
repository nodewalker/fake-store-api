import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, errors, json, colorize } = format;

export const LoggerInstance = {
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    process.env.NODE_ENV === 'production' ? json() : colorize({ all: true }),
    process.env.NODE_ENV === 'production'
      ? json()
      : printf(
          (a: { level; message; timestamp; stack }) =>
            `${a.timestamp} [${a.level}] ${a.stack || a.message}`,
        ),
  ),
  transports: [
    new transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      zippedArchive: true,
      maxFiles: '30d',
    }),

    new transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '14d',
    }),
    new transports.Console({
      format: combine(
        colorize(),
        nestWinstonModuleUtilities.format.nestLike('fake-store-api', {
          prettyPrint: true,
        }),
      ),
    }),
  ],
};
