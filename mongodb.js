const colors = require('colors');
exports.run = (client) => {
  client.mongodbStatus = false;

  client.MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');

  // Connection URL
  const url = 'mongodb://localhost:27017';

  // Database Name
  const dbName = 'Penguino';

  // Use connect method to connect to the server
  client.MongoClient.connect(url, function(err, clienty) {
    assert.equal(null, err);
    const db = clienty.db("Penguino");
    console.log("Connected to the mongodb instance".green);
    clienty.close();
  });
}
