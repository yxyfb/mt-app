import mongoose from 'mongoose'

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)


let Order = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  user: { //用户信息
    type: String,
    require: true,
  },
  time: { //创建的时间
    type: String,
    require: true
  },
  detail: {
    type: Array,
    required: true
  },
  status: {
    type: Number,
    required: true
  }
});

export default mongoose.model('Order', Order);
