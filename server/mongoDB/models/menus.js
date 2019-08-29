import mongoose from 'mongoose';

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

let menuSchema = new mongoose.Schema({
  menu: {
    type: Array,
    require: true
  }
});

export default mongoose.model('Menu', menuSchema);
