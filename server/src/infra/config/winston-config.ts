import 'winston-daily-rotate-file'

import { WinstonModule, WinstonModuleOptions } from 'nest-winston'
import { config, format, transports } from 'winston'

export const winstonConfig: WinstonModuleOptions = {
  levels: config.npm.levels,
  level: 'verbose',
  transports: [
    new transports.DailyRotateFile({
      level: 'error',
      filename: `logs/%DATE%-error.log`,
      format: format.combine(format.timestamp(), format.json()),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '2d',
    }),
    new transports.DailyRotateFile({
      level: 'warn',
      filename: `logs/%DATE%-warn.log`,
      format: format.combine(format.timestamp(), format.json()),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '2d',
    }),
    new transports.DailyRotateFile({
      level: 'log',
      filename: `logs/%DATE%-log.log`,
      format: format.combine(format.timestamp(), format.json()),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '2d',
    }),
  ],
}

export const logger = WinstonModule.createLogger(winstonConfig)
