const repl = require('repl');
const logger = require('./loggerConfig/logger');

repl.start({
  prompt: 'app >',
}).on('exit', () => {
  logger.log('info', {
    category: 'server log',
    payload: {
      message: 'disconnected',
    },
  });
});
