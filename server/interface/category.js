import Router from 'koa-router'
import axios from './utils/axios'

let router = new Router({
  prefix: '/category'
});

const sign = '916a11cd7b81b6a07188460bbf93d2e9'; //地理位置接口参数

router.get('/crumbs', async (ctx) => {
  const {
    status,
    data: {
      areas,
      types
    }
  } = await axios.get('http://cp-tools.cn/categroy/crumbs', {
    params: {
      sign,
      city: ctx.query.city ? ctx.query.city.replace('市', '') : "北京",
    }
  });

  ctx.body = {
    areas: status === 200 ? areas : [],
    types: status === 200 ? types : []
  }
})
export default router;
