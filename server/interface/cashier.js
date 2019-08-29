import Router from 'koa-router'
import Cashier from '../mongoDB/models/cashier' //数据库

let router = new Router({
  prefix: '/cashier'
})


router.post('/create', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '请登录'
    }
  } else {
    //获取购物车id
    const time = new Date().getTime();

    //获取提交的信息
    const {
      params: {
        detail,
        cashierId
      }
    } = ctx.request.body;

    //存数据库
    let cashier = new Cashier({
      cashierId,
      detail,
      cashierTime: time,
      user: ctx.session.passport.user, //中间件方法，获取user信息
    });
    let result = await cashier.save(); //链接数据库

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

router.post('/getCashier', async (ctx) => {
  let {
    cashierId
  } = ctx.request.body;

  try {
    //在数据库查找相同的购物车id
    let result = await Cashier.findOne({
      cashierId
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
