import mongoose from 'mongoose'

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)


let Cart = new mongoose.Schema({
  id: { //商品id
    type: String,
    require: true
  },
  detail: { //商品信息
    type: Array,
    require: true
  },
  cartId: { //购物车id
    type: String,
    require: true
  },
  cartTime: { //创建购物车时间
    type: String,
    required: true
  },
  user: { //用户信息
    type: String,
    required: true
  }
});

export default mongoose.model('Cart', Cart);
