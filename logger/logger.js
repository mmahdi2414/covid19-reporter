const { createLogger, format, transports } = require('winston');
const { combine, timestamp , printf} = format;
const level = 'debug';

const logger = createLogger({
    level,
    format: combine(
        timestamp(),
        printf(info =>`new ${info.level} {\n  message: ${info.message}\n  timestamp: ${info.timestamp}\n}\n`),
    ),
    transports: [
        new transports.Console({eol : '\r\n\r\n'}),
        new transports.File({
            eol : '\r\n\r\n',
            filename: 'logger.log'
        })
    ]
});

function log(level , message){
    logger.log({
        message,
        level
      });
}


module.exports = log;