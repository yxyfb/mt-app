import Router from 'koa-router'
import axios from './utils/axios'
import Menu from '../mongoDB/models/menus'
import Prevince from '../mongoDB/models/provinces'

let router = new Router({
  prefix: '/geo'
});




const sign = '916a11cd7b81b6a07188460bbf93d2e9'; //地理位置接口参数

//当前ip地理位置接口
router.get('/getPosition', async (ctx) => {
  let {
    status,
    data: {
      province,
      city
    }
  } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`);



  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

//菜单接口
router.get('/menu', async (ctx) => {
  let result = await Menu.findOne();

  ctx.body = {
    code: 0,
    menu: result.menu
  }
})

//省份接口
router.get('/prevince', async (ctx) => {
  let result = await Prevince.find();

  ctx.body = {
    code: 0,
    prevince: result.map(item => {
      return {
        id: item.id,
        name: item.value[0]
      }
    })
  }
})

//获取当前省份所有城市接口
router.get('/prevince/:id', async (ctx) => {
  const {
    status,
    data: {
      city
    }
  } = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)

  ctx.body = {
    city: status === 200 ? city : []
  }
})

//获取全国所有城市接口
router.get('/city', async (ctx) => {
  const {
    status,
    data: {
      city
    }
  } = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`)

  ctx.body = {
    code: 0,
    city: status === 200 ? city : []
  }
})

//获取热门城市
router.get('/hotCity', async (ctx) => {
  let {
    status,
    data: {
      hots
    }
  } = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);

  ctx.body = {
    code: 0,
    hots: status === 200 ? hots : []
  }
})



export default router;
