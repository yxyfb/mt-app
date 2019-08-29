<template>
    <div class="life">
        <el-row>
            <el-col :span='14'>
                <v-Slider></v-Slider>
            </el-col>
            <el-col :span='4'>
                <div class="life-pic"></div>
            </el-col>
            <el-col :span='6'>
                <div class="life-logo">
                    <h4>
                        <img src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg" />
                    </h4>
                    <p class="life-login-name">Hi! 你好</p>
                    <p>
                        <nuxt-link to='/register'>
                            <el-button round
                                       size='medium'>注册</el-button>
                        </nuxt-link>
                    </p>
                    <p>
                        <nuxt-link to='/login'>
                            <el-button round
                                       size='medium'>立即登录</el-button>
                        </nuxt-link>
                    </p>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='7'>
                <div class="life-hotel"></div>
            </el-col>
            <el-col :span='7'>
                <div class="life-music"></div>
            </el-col>
            <el-col :span='4'>
                <div class="life-coop"></div>
            </el-col>
            <el-col :span='6'>
                <div class="life-downapp">
                    <img src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png"
                         alt="下载APP" />
                    <p>美团APP手机版</p>
                    <p><span class="red">1元起</span><i class="gary">吃喝玩乐</i></p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Slider from './slider';

export default {
    components: {
        'v-Slider': Slider
    }
}
</script>

<style lang="scss" scoped>
.life {
    padding-top: 10px;
    .el-row:first-child {
        margin-bottom: 10px;
    }
    .life-pic {
        width: 150px;
        height: 240px;
        margin: 0 auto;
        background: url("//p0.meituan.net/codeman/e473bb428f070321269b23370ff02ba956209.jpg")
            no-repeat;
        background-size: 100%;
    }
    .life-logo {
        width: 230px;
        height: 240px;
        margin: 0 auto;
        text-align: center;
        background: #fff;
        border: 1px solid #e5e5e5;
        img {
            margin-top: 30px;
            width: 47px;
            height: 47px;
            border-radius: 50%;
            border: 4px solid #e5e5e5;
        }
        .life-login-name {
            padding-top: 6px;
            font-size: 16px;
            color: #222;
            font-weight: 500;
        }
        .el-button {
            width: 120px;
            height: 40px;
            margin-top: 10px;
        }
    }
    .life-hotel {
        width: 270px;
        height: 165px;
        background: url(//p1.meituan.net/codeman/8cce56c467a17e04f3094d1e455462a0132772.png)
            no-repeat;
        background-size: 100%;
    }
    .life-music {
        width: 277px;
        height: 165px;
        background: url(//p1.meituan.net/codeman/16442c19da1f1c4544f794e29d99c92051716.jpg)
            no-repeat;
        background-size: 100%;
    }
    .life-coop {
        width: 150px;
        height: 165px;
        margin: 0 auto;
        background: url(http://p1.meituan.net/codeman/5b21cddb4bb1cbc3a9c3bce0f726c75940469.jpg)
            no-repeat;
        background-size: 100%;
    }
    .life-downapp {
        height: 165px;
        text-align: center;
        background-color: #fff;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        img {
            width: 95px;
            height: 95px;
        }
        p {
            font-size: 16px;
            color: #222222;
            font-weight: 500;
            span {
                color: #ec5330;
                margin-right: 5px;
                font-size: 12px;
            }
            i {
                font-size: 12px;
                color: #3f3f3f;
            }
        }
    }
}
</style>
