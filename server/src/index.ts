import * as http from 'http';
import * as mongoose from 'mongoose';
import * as socket from 'socket.io';

import config from './config/config';
import App from './app';

(mongoose.Promise as any) = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });

App.set('port', config.port);

const server = http.createServer(App);
const io = socket(server);
App.set('socketio', io);

server.listen(config.port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = (typeof config.port === 'string') ? 'Pipe ' + config.port : 'Port ' + config.port;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}
