require('dotenv').config();
import Server from './Server';

const server: Server = new Server();
server.listen();