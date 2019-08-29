import mongoose from 'mongoose';

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, //唯一的
    require: true //必须的
  },
  password: {
    type: String,
    require: true //必须的
  },
  email: {
    type: String,
    require: true //必须的
  }
});

export default mongoose.model('User', userSchema);
