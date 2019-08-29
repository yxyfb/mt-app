import mongoose from 'mongoose'


let Province = new mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  value: {
    type: Array,
    require: true
  }
});

export default mongoose.model('Province', Province);
