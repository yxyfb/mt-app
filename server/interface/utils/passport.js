import passport from 'koa-passport'; //koa的一个中间件，用于登录验证
import localStrategy from 'passport-local'; //本地验证策略包
import user from '../../mongoDB/models/users';

passport.use(new localStrategy(async (username, password, done) => {
  let where = {
    username
  };
  const result = await user.findOne(where);


  if (result !== null) {

    //如果数据库中得到密码等于传递进来的密码，就是验证成功
    if (result.password === password) {
      /*done的第一个参数为错误信息，没有就返回null，第二个参数为用户信息（验证失败则为false），第三个为错误信息*/
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }

  } else {
    return done(null, false, '用户不存在')
  }
}))


/*序列化在ctx.login()函数调用时触发,会自动在ctx.state.user中添加done中的第二个参数，并在session中添加用户登录状态*/
/* session存在cook中 */
passport.serializeUser((user, done) => {
  return done(null, user);
})

/*反序列化，会在用户请求到来的时候从session中解析用户信息，如果在登录状态，则在ctx.state.user中添加ctx.login()函数执行时添加进去的参数*/
passport.deserializeUser(function (user, done) {
  return done(null, user)
})

export default passport;
