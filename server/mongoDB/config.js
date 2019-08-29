module.exports = ({
  dbs: 'mongodb://127.0.0.1:27017/student',
  redis: {
    get host() { //只读地址，不能更改
      return '127.0.0.1';
    },
    get prot() { //radis的端口号
      return 6379;
    }
  },
  stmp: { //QQ邮箱服务
    get host() {
      return 'smtp.qq.com';
    },
    get user() {
      return '392584117@qq.com';
    },
    get pass() { //QQ邮箱开启授权码
      return 'nafxjylazxzybjjh'
    },

    //----------------------
    get code() { //获取验证码,toString(16),将数字转化为16进制
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase();
      }
    },
    get expire() { //调取过期时间
      return () => {
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  }
})
