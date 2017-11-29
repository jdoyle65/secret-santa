'use strict';
const Server = require('./server/Server');

const server = new Server(3000);
server.run();
