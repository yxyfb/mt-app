<template>
    <div class="register">
        <header class='clearfix'>
            <div class="header-wrapper">
                <a href="/"
                   class="logo"></a>
                <div class="login-block">
                    <span>已有美团账号？</span>
                    <a href="/login">
                        <el-button type="warning"
                                   size='mini'>登录</el-button>
                    </a>
                </div>
            </div>
        </header>
        <section>
            <el-form :model="ruleForm"
                     :rules="rules"
                     ref="ruleForm"
                     label-width="100px"
                     label-position="right">

                <el-form-item label="昵称"
                              prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item label="邮箱"
                              prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                    <el-button size='mini'
                               round
                               @click='sendMsg'>发送验证码</el-button>
                    <span class="status">{{statusMsg}}</span>
                </el-form-item>

                <el-form-item label="验证码"
                              prop="code">
                    <el-input v-model="ruleForm.code"
                              maxlength="4"></el-input>
                </el-form-item>

                <el-form-item label="密码"
                              prop="pwd">
                    <el-input v-model="ruleForm.pwd"
                              type='password'
                              autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码"
                              prop="cpwd">
                    <el-input v-model="ruleForm.cpwd"
                              type='password'
                              autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type='warning'
                               @click='register'>同意以下协议并注册</el-button>
                    <div class="error">{{error}}</div>
                </el-form-item>

                <el-form-item>
                    <a class="f1"
                       href="http://www.meituan.com/about/terms"
                       target="_blank">《美团网用户协议》</a>
                </el-form-item>
            </el-form>
        </section>

        <footer>©meituan.com 京ICP证070791号 京公网安备11010502025545号</footer>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js'   //密码加密包

export default {
    layout: 'blank',
    data () {
        return {
            statusMsg: '',
            error: '',
            ruleForm: {
                name: '',
                email: '',
                code: '',
                pwd: '',
                cpwd: ''
            },
            rules: {
                name: [
                    { type: 'string', required: true, message: '请输入你的昵称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                email: [
                    { type: 'email', required: true, message: '请输入你的邮箱', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '创建密码', trigger: 'blur' }
                ],
                cpwd: [
                    { required: true, message: '确定密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'));
                            } else if (value !== this.ruleForm.pwd) {
                                callback(new Error('两次输入密码不一致!'));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        //验证码
        sendMsg () {
            let namePass;
            let emailPass;
            if (this.timerid) {
                return false;
            }

            //程序中验证用户名是否通过验证
            this.$refs['ruleForm'].validateField('name', (valid) => {
                namePass = valid;
            })
            this.statusMsg = '';
            if (namePass) {//有值，就是没有通过验证
                return false;
            }
            //邮箱验证
            this.$refs['ruleForm'].validateField('email', (valid) => {
                emailPass = valid;
            })


            if (!namePass && !emailPass) {//都通过
                this.$axios.post('/users/verify', {
                    username: encodeURIComponent(this.ruleForm.name),
                    email: this.ruleForm.email
                }).then(({ status, data }) => {
                    if (status === 200 && data && data.code === 0) {
                        let count = 60;
                        this.statusMsg = `验证码已发送，剩余${count--}秒`;
                        this.timerid = setInterval(() => {
                            this.statusMsg = `验证码已发送，剩余${count--}秒`;
                            if (count < 0) {
                                this.statusMsg = `重新获取验证码`;
                                clearInterval(this.timerid);
                            }
                        }, 1000);
                    } else {
                        this.statusMsg = data.msg;
                    }
                })
            }
        },

        //注册
        register () {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.$axios.post('/users/signup', {
                        username: window.encodeURIComponent(this.ruleForm.name),
                        password: CryptoJS.MD5(this.ruleForm.pwd).toString(),
                        code: this.ruleForm.code,
                        email: this.ruleForm.email
                    }).then(({ status, data }) => {
                        if (status === 200) {
                            if (data && data.code === 0) {
                                console.log(data)
                                location.href = '/login';
                            } else {
                                this.error = data.msg;
                            }

                        } else {
                            this.error = `服务器出错，错误码：${status}`;
                        }

                        setTimeout(() => {
                            this.error = '';//自动清空
                        }, 1500)
                    })
                }
            })

        }
    }
}

</script>

<style lang="scss" scoped>
.register {
    header {
        border-bottom: 2px solid #ddd;
        padding-bottom: 10px;
        .header-wrapper {
            width: 1000px;
            margin: 0 auto;
            padding: 10px 0;
            > a {
                float: left;
                width: 128px;
                height: 36px;
                background: url(//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png)
                    no-repeat;
                background-size: contain;
            }
            .login-block {
                float: right;
                line-height: 36px;
            }
        }
    }
    section {
        padding: 30px 0;
        border-bottom: 1px solid #ddd;
        .el-form {
            width: 900px;
            margin: 0 auto;
            .el-form-item {
                max-width: 360px;
            }
            .el-input {
                width: 248px;
            }
            a {
                color: #fe8c00;
            }
        }
    }
    footer {
        padding-top: 20px;
        text-align: center;
        font-size: 12px;
        color: #ccc;
    }
}
</style>
