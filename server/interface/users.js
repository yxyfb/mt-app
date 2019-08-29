import Router from 'koa-router';
import Redis from 'koa-redis';
import nodeMailer from 'nodemailer'; //自己邮箱向注册邮件发送验证码必备node工具包
import User from '../mongoDB/models/users';
import Email from '../mongoDB/config';
import Passport from './utils/passport';
import Axios from './utils/axios';

let router = new Router({
  prefix: '/users'
});

let Store = new Redis().client; //redis客户端


//注册接口
router.post('/signup', async (ctx) => {
  //获取注册时，传递进来的数据
  const {
    username,
    password,
    code,
    email
  } = ctx.request.body;


  //1.验证验证码
  if (code) {
    //获取哈希表中指定的字段值
    //modeMail发验证码时会在redis中存一下，这里要在redis中获取
    const saveCode = await Store.hget(`nodemail:${username}`, 'code');
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');
    console.log(saveExpire, code, saveCode)
    if (saveCode === code) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码过期，请重新尝试'
        }
        return false;
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请输入正确的验证码'
      }
      return false;
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
    return false;
  }

  //2.验证用户名是否已注册
  let user = await User.find({
    username
  });

  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '用户名已注册'
    }
    return
  }

  //3.都通过后，将数据写入库中
  let nuser = await User.create({
    username,
    password,
    email
  });

  //4.检测是否写入成功，成功就登录
  if (nuser) {
    let res = await Axios.post('/users/signin', {
      username,
      password
    });
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})


//登录接口
router.post('/signin', async (ctx, next) => {
  //策略的主体就是authenticate()函数，在成功的时候返回用户身份，失败的时候返回错误
  return Passport.authenticate('local', (err, user, info, status) => {
    if (err) {
      ctx.body = {
        code: -1,
        msg: '登录失败'
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user);
      } else {
        ctx.body = {
          code: 1,
          msg: '登录失败'
        }
      }
    }
  })(ctx, next)
})


//验证码验证接口
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username;
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');
  if (saveExpire && new Date().getTime() - saveExpire < 0) { //如果在一分钟内，不能重复调用
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false;
  }

  //nodeMailer配置,发邮件的对象
  const transporter = nodeMailer.createTransport({
    host: Email.stmp.host,
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
      user: Email.stmp.user,
      pass: Email.stmp.pass
    }
  });

  //要接收的信息
  const ko = {
    code: Email.stmp.code(),
    expire: Email.stmp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }

  //邮件中要显示什么信息
  let option = {
    from: Email.stmp.user, //发送邮件的邮箱
    to: ko.email, //目标邮箱,多个邮箱用逗号隔开
    subject: '高仿美团注册码', //标题
    html: `你的邀请码是${ko.code}` //内容
  }

  //发送
  await transporter.sendMail(option, function (error, response) {
    if (error) {
      return console.log("这里错了 " + error);
    } else { //发送成功，就将数据存在redis中，和注册接口联系起来
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email);
    }
  });

  ctx.body = {
    code: 0,
    msg: '验证码已发送，有可能会有延迟，有效期1分钟'
  }

})


//退出登录接口
router.get('/exit', async (ctx) => {
  await ctx.logout(); //退出

  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})


//获取用户名
router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    //如果是登录状态，就能获取到当前用户
    const {
      username,
      email
    } = ctx.session.passport.user;
    ctx.body = {
      user: username,
      email
    }

  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})


export default router;
