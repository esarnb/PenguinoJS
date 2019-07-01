const colors = require('colors');
const fs = require("fs");
exports.run = (client) => {


  /**
   * Mongo DB implementation of flags
   */

  //  /* If it is not in the database, insert it*/
  //  const url = 'mongodb://localhost:27017';
  //  client.MongoClient.connect(url, function(err, clienty) {
  //    const db = clienty.db("Penguino");
  //    console.log("Checking for PerServerOptions".yellow);
  //    findAllDocuments(db, clienty)
  //  });

  //    function createList() {
  //      listOfGuildsObject = {};
  //      listOfEventsObject = {};

  //      let files = fs.readdirSync("/home/emp/Penguino/events/");
  //      let events = files.filter(f => f.split('.').pop() === 'js');
  //      events = events.map(x => x.split(".")[0]);
  //      events.forEach(perEvent => {
  //          if (!listOfEventsObject.hasOwnProperty[perEvent]) listOfEventsObject[perEvent] = { enabled: false, channel: false };
  //      })

  //      client.guilds.map(x => x.id).forEach(perGuild => {
  //         if (!listOfGuildsObject.hasOwnProperty(perGuild.id)) listOfGuildsObject[perGuild] = listOfEventsObject;
  //       })

  //       return listOfGuildsObject;
  //    }

  //  /*      First Time Insert   */

  //  const insertDocuments = function(db, clienty) {
  //    // Get the documents collection
  //    const collection = db.collection('PerServerOptions');
  //    // Insert some documents
  //    collection.insertOne(createList(), function(err, result) {
  //      if (err) {
  //        clienty.close();
  //        throw err;
  //      }
  //      else console.log("Successfully inserted PerServerOptions");
  //    });
  //  }

  //  /*      Checking if it exists     */

  //  const findAllDocuments = function(db, clienty) {
  //    // Get the documents collection
  //    const collection = db.collection('PerServerOptions');
  //    // Find some documents
  //    collection.find({}).toArray(function(err, docs) {
  //      if (err) throw err;
  //      if (docs.length > 0) {
  //        console.log("Found PerServerOptions. Check client.PerServerOptions");
  //        client.PerServerOptions = docs;
  //        // console.log(docs);
  //        clienty.close()
  //      }
  //      else {
  //         console.log("Could not find docs, inserting one.");
  //         insertDocuments(db, clienty)
  //      }
  //    });
  //  }

}
