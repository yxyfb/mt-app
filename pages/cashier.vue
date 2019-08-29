<template>
    <section>
        <div class="cd box">
            <i class="icon el-icon-stopwatch"></i>
            <span class="cd-text">
                请在
                <span class="cd-time">{{time}}</span>
                内完成支付，超时订单会自动取消
            </span>
        </div>

        <div class="item box">
            <span>项目：{{name}}</span>
            <span>应付金额￥<b>{{allPrice}}</b></span>
        </div>

        <div class="tab box clearfix">
            <el-tabs type="card">
                <el-tab-pane label="支付宝/微信">
                    <ul class='clearfix'>
                        <li>
                            <label>
                                <input type="radio"
                                       name="buy"
                                       value="wx"
                                       v-model="value">
                                <img src="https://p1.meituan.net/pay/pc_wxqrpay.png">
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio"
                                       name="buy"
                                       value="zfb"
                                       v-model="value">
                                <img src="https://p0.meituan.net/pay/alipaypcnew.png">
                            </label>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="个人网银支付">暂未开通个人网银支付</el-tab-pane>
            </el-tabs>
            <p>支付金额￥<b>{{allPrice}}</b></p>
            <el-button type='warning'
                       @click='pay'>去付款</el-button>

        </div>

        <div v-show='sure'
             class='sucess'>
            <span>付款成功</span>
            <p>{{gotime}}秒后自动跳转到我的订单</p>
        </div>
    </section>
</template>

<script>

export default {
    data () {
        return {
            value: 'wx',
            sure: false,
            gotime: 5,
            alltime: 86400,  //一天总共的秒数
            time: '24:00:00'
        }
    },
    async asyncData (ctx) {
        const { status, data: { code, data: { name, allPrice } } } = await ctx.$axios.post('/cashier/getCashier', {
            cashierId: ctx.query.cartId
        });

        if (status === 200 && code === 0) {
            return {
                name,
                allPrice,
                cashierId: ctx.query.cartId
            }
        }
    },
    methods: {
        //这里没有支付系统，只有点击了这个按钮，就表示已付款
        async pay (ctx) {
            const { status, data: { code } } = await this.$axios.post('/order/update', {
                params: {
                    cartId: this.cashierId,
                    status: 1
                }
            });

            //支付成功，跳转我的订单
            if (status === 200 && code === 0) {

                this.sure = true;
                this.timer = setInterval(() => {
                    this.gotime--;
                    if (this.gotime === 0) {
                        clearInterval(this.timer);
                        this.$router.push('/order');
                    }
                }, 1000);
            }



        }
    },
    mounted () {
        this.mytime = setInterval(() => {
            this.alltime--;
            if (this.sure) {
                clearInterval(this.mytime);
            }

            let h = parseInt(this.alltime / (60 * 60) % 24);
            let m = Math.floor(this.alltime / 60 % 60);//this.alltime除以60，是把this.alltime变成分，再%60,是变成小时，多余的就是分钟数
            let s = this.alltime % 60;

            h = h >= 10 ? h : '0' + h;
            m = m >= 10 ? m : '0' + m;
            s = s >= 10 ? s : '0' + s;

            this.time = h + ':' + m + ':' + s
        }, 1000)
    }
}
</script>

<style lang="scss" scoped>
section {
    width: 1000px;
    margin: 0 auto;
    position: relative;
    .box {
        border: 1px solid #e5e5e5;
        border-radius: 5px;
        background: #fff;
    }
    .cd {
        margin: 20px 0;
        padding: 10px 0;
        text-align: center;
        i {
            padding-right: 5px;
            color: #f60;
            font-size: 20px;
            vertical-align: bottom;
        }
        .cd-text {
            font-size: 12px;
            color: #777;
            span {
                padding: 0 5px;
                color: #f60;
                font-size: 18px;
            }
        }
    }
    .item {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        span:first-child {
            font-size: 20px;
            color: #222;
            width: 600px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        span:last-child {
            font-size: 12px;
            color: #f60;
            b {
                font-size: 20px;
            }
        }
    }
    .tab {
        margin-top: 20px;
        padding: 30px 20px 40px;
        ul {
            li {
                float: left;
                margin-right: 20px;
                list-style: none;
                label {
                    display: flex;
                    align-items: center;
                }
            }
        }
        p {
            margin-top: 70px;
            text-align: right;
            font-size: 12px;
            color: #f60;
            b {
                font-size: 20px;
            }
        }
        .el-button {
            float: right;
            margin-top: 15px;
        }
    }
    .sucess {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span {
            padding: 5px;
            border-radius: 3px;
            background: #f60;
            color: #fff;
            font-size: 30px;
        }
        p {
            display: block;
            padding: 10px;
        }
    }
}
</style>