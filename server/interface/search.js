import Router from 'koa-router'
import axios from './utils/axios'

let router = new Router({
  prefix: '/search'
});

const sign = '916a11cd7b81b6a07188460bbf93d2e9'; //地理位置接口参数


//根据input值搜素当前城市的商品
router.get('/top', async (ctx) => {
  let {
    status,
    data: {
      top
    }
  } = await axios.get('http://cp-tools.cn/search/top', {
    params: {
      input: ctx.query.input, //get方式获取input框传递的值，ctx.query,post方式就是.ctx.request.body
      city: ctx.query.city,
      sign
    }
  })

  ctx.body = {
    code: 0,
    top: status === 200 ? top : []
  }
})

//当前城市热门推荐
router.get('/hotPlace', async (ctx) => {
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city;
  let {
    status,
    data: {
      result
    }
  } = await axios.get('http://cp-tools.cn/search/hotPlace', {
    params: {
      sign,
      city
    }
  })

  ctx.body = {
    code: 0,
    result: status === 200 ? result : []
  }
})


//获取商品
router.get('/resultsByKeywords', async (ctx) => {
  const {
    city,
    keyword
  } = ctx.query;
  let {
    status,
    data: {
      count,
      pois
    }
  } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
    params: {
      city,
      keyword
    }
  })

  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : []
  }
})


//店铺详情页的接口
router.get('/products', async (ctx) => {
  //获取城市，再获取到关键字，就能搜索商品信息
  const {
    city,
    keyword
  } = ctx.query;

  const {
    status,
    data: {
      product,
      more
    }
  } = await axios.get(`http://cp-tools.cn/search/products`, {
    params: {
      city,
      keyword,
      sign
    }
  })

  if (status === 200) {
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more : [], //ctx.isAuthenticated()方法判断是否是登录状态
      login: ctx.isAuthenticated()
    }
  } else {
    ctx.body = {
      product: {},
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  }
})



export default router;
