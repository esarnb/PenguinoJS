module.exports = (mongoose) => {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;
  
  const PrefixesSchema = new Schema({
    author: ObjectId,
    guildid: Number,
    prefix: { type: String, default: '>' },
  });

  const PrefixesModel = mongoose.model("Prefixes", PrefixesSchema);

  return PrefixesModel;
}

