"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.winstonConfig = void 0;
require("winston-daily-rotate-file");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
exports.winstonConfig = {
    levels: winston_1.config.npm.levels,
    level: 'verbose',
    transports: [
        new winston_1.transports.DailyRotateFile({
            level: 'error',
            filename: `logs/%DATE%-error.log`,
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxFiles: '2d',
        }),
        new winston_1.transports.DailyRotateFile({
            level: 'warn',
            filename: `logs/%DATE%-warn.log`,
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxFiles: '2d',
        }),
        new winston_1.transports.DailyRotateFile({
            level: 'log',
            filename: `logs/%DATE%-log.log`,
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxFiles: '2d',
        }),
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.cli(), winston_1.format.splat(), winston_1.format.timestamp(), winston_1.format.printf((info) => {
                return `${info.timestamp} ${info.level}: ${info.message}`;
            })),
        }),
    ],
};
exports.logger = nest_winston_1.WinstonModule.createLogger(exports.winstonConfig);
//# sourceMappingURL=winston-config.js.map