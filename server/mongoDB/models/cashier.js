import mongoose from 'mongoose'

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)


let Cashier = new mongoose.Schema({
  detail: { //商品信息
    type: Array,
    require: true
  },
  cashierId: { //购物车id
    type: String,
    require: true
  },
  cashierTime: { //支付时间
    type: String,
    required: true
  },
  user: { //用户信息
    type: String,
    required: true
  }
});

export default mongoose.model('Cashier', Cashier);
