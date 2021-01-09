module.exports = (mongoose) => {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;
  
  const MusicSchema = new Schema({
    author: ObjectId,
    guildid: Number,
    queue: { type: Object, default: {queue: [{}]} },
    nowPlaying: { type: Object, default: {}},
    volume: { type: Number, default: 25},
  });

  const MusicModel = mongoose.model("Musics", MusicSchema);

  return new MusicModel();
}


