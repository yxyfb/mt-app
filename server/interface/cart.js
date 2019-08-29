import Router from 'koa-router'
import Cart from '../mongoDB/models/cart' //数据库
import md5 from 'crypto-js/md5' //加密包，传输密码等信息时，加密

let router = new Router({
  prefix: '/cart'
})


router.post('/create', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '请登录'
    }
  } else {
    //获取购物车id
    const time = new Date();
    const cartId = md5(Math.random() * 1000 + time).toString(); //购物车id，不会重复

    //获取提交的信息
    const {
      params: {
        detail,
        id
      }
    } = ctx.request.body;

    //存数据库
    let cart = new Cart({
      id,
      cartId,
      detail,
      cartTime: time,
      user: ctx.session.passport.user, //中间件方法，获取user信息
    });
    let result = await cart.save(); //链接数据库

    if (result) {
      ctx.body = {
        code: 0,
        msg: '',
        cartId: cartId
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '链接失败'
      }
    }

  }
})

router.post('/getCart', async (ctx) => {
  let {
    cartId
  } = ctx.request.body;

  try {
    //在数据库查找相同的购物车id
    let result = await Cart.findOne({
      cartId
    });

    ctx.body = {
      code: 0,
      data: result ? result.detail[0] : {}
    }

  } catch (error) {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})

export default router
