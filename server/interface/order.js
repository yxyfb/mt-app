import Router from 'koa-router'
import Order from '../mongoDB/models/order'

let router = new Router({
  prefix: '/order'
})

//创建订单
router.post('/create', async (ctx) => {

  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '请登录'
    }
  } else {
    //订单创建的时间
    const time = new Date().getTime();

    //获取提交的信息
    const {
      params: {
        cartId,
        detail,
        status,
        user
      }
    } = ctx.request.body;

    //存数据库
    let order = new Order({
      id: cartId,
      detail,
      orderTime: time,
      status, //是否支付的状态
      user: user, //中间件方法，获取user信息
    });
    let result = await order.save(); //链接数据库

    if (result) {
      ctx.body = {
        code: 0,
        msg: ''
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '链接失败'
      }
    }

  }
})

//修改订单的付款状态
router.post('/update', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '请登录'
    }
  } else {

    const {
      params: {
        cartId,
        status
      }
    } = ctx.request.body;
    const result = await Order.where({
      id: cartId
    }).update({
      status: status
    });

    if (result) {
      ctx.body = {
        code: 0,
        msg: ''
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '支付失败'
      }
    }
  }
})

//获取订单状态
router.post('/getOrder', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      list: [],
      msg: '没有登录'
    }
  } else {
    const {
      params: {
        user
      }
    } = ctx.request.body;
    try {
      let result = await Order.find({
        user: user
      });
      if (result) {
        ctx.body = {
          code: 0,
          list: result
        }
      } else {
        ctx.body = {
          code: -1,
          list: []
        }
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        list: [],
        msg: error
      }
    }
  }
})


export default router
