module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
    
    const EmojiSchema = new Schema({
      emoji: String,
      count: { type: Number, default: 0 },
      guildid: String
    });
  
    const EmojiModel = mongoose.model("Emojis", EmojiSchema);
  
    return new EmojiModel();
  }
  
  
  