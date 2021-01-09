require("dotenv").config()
const fs = require("fs")
const mongoose = require("mongoose")

module.exports = async (client) => {
  
  let dir = __dirname + `/Models/`;
  
  // Connect to localhost mongodb
  client.mongo = await mongoose.connect(`mongodb://${process.env.MongoUser}:${process.env.MongoPass}@localhost:27017/${process.env.MongoDB}?authSource=PJSDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    
  }, (err) => {
    if (err) console.log(err);
  })
  client.mongo.models = new client.discord.Collection();
  
  // Read in all the models 
  fs.readdir(dir, (err, files) => {
    if (err) return console.error(err);
    let models = files.filter(f => f.split('.').pop() === 'js');
    if (!models.length) return console.log('No Models found...'.red);
    console.log(`Loading ${files.length} Model...`.blue); 
    models.forEach((f, i) => { 
      const model = require(`${dir}${f}`)(mongoose);
      client.mongo.models.set(f, model); 
      console.log(`${i + 1}: ${f} loaded!`.yellow);
    });
  });

}
