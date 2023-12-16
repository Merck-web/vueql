const os = require('os');
const WinstonLogStash = require('winston3-logstash-transport');
const { addColors, transports, format, createLogger } = require('winston');

const colorsLogger = {
    error: 'red',
    warn:  'yellow',
    info:  'cyan',
    debug: 'blue',
};

addColors(colorsLogger);

const myFormat = format.printf(({ level, message, timestamp, ...metadata }) => {
    // let msg = `${ timestamp } [${ level }] : ${ message } `;

    // if (isString(message)) {
    //     message = message.replace(/\s{2,}/g, ' ');
    // }
    //
    // if (isObject(message) || isArray(message)) {
    //     message = JSON.stringify(message);
    // }
    //
    // let msg = `"level":"","time":${ new Date().getTime() },"pid":${ process.pid },"hostname":"${ os.hostname() }","timestamp":"${ timestamp }","type":"${ level }","msg":"${ message }"`;
    //
    // if (metadata) {
    //     msg += `,"msgMeta":"${ JSON.stringify(metadata) }"`;
    // }
    //
    // msg += ',"v":1';

    // return `{${ msg }}`;

    let msg = {
        level:     '',
        time:      new Date().getTime(),
        pid:       process.pid,
        hostname:  os.hostname(),
        timestamp: timestamp,
        type:      level,
        msg:       message || '',
        msgMeta:   metadata,
        v:         1,
    };

    return JSON.stringify(msg);
});

const logger = createLogger({
    // color: 'red',
    transports: [
        // new transports.File({ filename: 'error.log', level: 'error' }),
        // new transports.File({ filename: 'combined.log', level: 'info' }),
        new transports.Console({
            level:       'debug',
            prettyPrint: true,
            json:        true,
            format:      format.combine(
                myFormat,
                format.timestamp({ format: 'isoDateTime' }),
                format.errors({ stack: true }),
                // format.prettyPrint(),
                format.colorize(), // see this
                // format.json(),
            ),
        }),
    ],
});

function infoLog(...args) {
    if (args.length === 1) {
        args = args[0];
    }

    logger.info(args);
}

function errorLog(...args) {
    if (args.length === 1) {
        args = args[0];
    }

    logger.error(args);
}

module.exports = {
    logger:   logger,
    infoLog:  infoLog,
    errorLog: errorLog,
};
