'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const participant = require('./routes/participant');


class Server {
  constructor(port = 3000) {
    this.port = port;
    this.app = express();
    this.init(this.app);
  }

  init(app) {
    app.use(bodyParser.json());
    app.get('/api', (req, res) => res.json({
      message: 'hello, world'
    }));
    app.use('/api/participant', participant);
  }

  run() {
    this.app.listen(this.port, () => {
      console.log(`Listening on localhost:${this.port}`);
    })
  }
}


module.exports = Server;
