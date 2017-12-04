'use strict';
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const participant = require('./routes/participant');
const Database = require('./Database');



class Server {
  constructor(port = 3000) {
    this.port = port;
    this.app = express();
    this.init(this.app);
  }

  init(app) {
    this.db = Database;
    // this.db.db.run('INSERT INTO users (?) VALUES(null, ?, ?, ?)', [
    //   'id, first_name, last_name, email',
    //   'Justin',
    //   'Doyle',
    //   'muddpuddle13@gmail.com'
    // ],(err, result) => {
    //   console.log('Result', err, result)
    // });
    app.use(bodyParser.json());
    app.use('/api/participant', participant);
  }

  run() {
    this.app.listen(this.port, () => {
      console.log(`Listening on localhost:${this.port}`);
    })
  }
}


module.exports = Server;
