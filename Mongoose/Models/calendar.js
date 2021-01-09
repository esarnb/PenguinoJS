module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
    
    const CalendarSchema = new Schema({
      author: ObjectId,
      event: String,         // Description
      date: Number,          // Date to start from
      channel: Number,       // Channel to send msg into 
      user: Number,          // Who requested / msg to send to
      repeat: {              // How long (daily length, weekly, etc)
        type: Number,        
        default: 0           // If Zero, it is disabled. If 1, it is only sent once.
      }
    });
  
    const CalendarModel = mongoose.model("Calendar", CalendarSchema);
  
    return new CalendarModel();
  }
  
  