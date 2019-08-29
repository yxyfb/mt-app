<template>
    <div class="login">
        <header>
            <a href="/"
               class="logo"></a>
        </header>

        <section class='clearfix'>
            <div class="login-banner">
                <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
                     width="480"
                     height="370"
                     alt="美团网">
            </div>
            <div class="login-right">
                <h4>账号登录</h4>
                <h4 v-if="error"
                    class="tips"
                    style='color:red'><i />{{ error }}</h4>
                <el-form ref="ruleForm">
                    <el-form-item>
                        <el-input v-model="username"
                                  auto-complete="off"
                                  prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password"
                                  v-model="pwd"
                                  prefix-icon="el-icon-key"
                                  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <a href='#'>忘记密码？</a>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning"
                                   @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>

        <footer>©2019 美团网团购 meituan.com 京ICP证070791号 京公网安备11010502025545号</footer>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
    layout: 'blank',
    data () {
        return {
            username: '',
            pwd: '',
            error: ''
        }
    },
    methods: {
        login () {
            console.log(window.encodeURIComponent(this.username))
              this.$axios.post('/users/signin', {
                username: window.encodeURIComponent(this.username),
                password: CryptoJS.MD5(this.pwd).toString()
            }).then(({ status, data }) => {
                if (status === 200) {
                    if (data && data.code === 0) {
                        location.href = '/';
                    } else {
                        this.error = data.msg;
                    }
                } else {
                    this.error = '服务器错误';
                }

                setTimeout(() => {
                    this.error = '';
                }, 2000)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    width: 980px;
    margin: 0 auto;
    header {
        margin: 40px 0;
        .logo {
            display: block;
            height: 54px;
            background: url(//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png)
                no-repeat;
            background-size: contain;
        }
    }

    section {
        background: #fff;
        .login-banner {
            float: left;
            margin-right: 115px;
        }
        .login-right {
            float: left;
            height: 373px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            h4 {
                font-weight: 400;
                color: #666;
            }
            .el-form-item {
                margin: 8px 0;
                .el-input {
                    width: 268px;
                    height: 34px;
                }
                .el-button {
                    width: 268px;
                }
                a {
                    float: right;
                    font-size: 12px;
                    color: #fe8c00;
                }
            }
        }
    }

    footer {
        padding-top: 20px;
        text-align: left;
        font-size: 12px;
        color: #ccc;
    }
}
</style>
