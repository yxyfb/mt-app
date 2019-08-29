<template>
    <section>
        <el-row>
            <el-col :span='24'
                    class='clearfix'>
                <v-List :table-data='cart'></v-List>
                <p class="price">
                    应付金额：<span>￥{{total}}</span>
                </p>
                <el-button type="warning"
                           @click='submit'>提交订单</el-button>
            </el-col>
        </el-row>
    </section>
</template>

<script>
import List from '@/components/cart/list'

export default {
    async asyncData (ctx) {
        const { status, data: { code, data: { name, price, imgs } } } = await ctx.$axios.post('/cart/getCart', { cartId: ctx.query.cartId })
        if (status === 200 && code === 0 && name) {
            return {
                cart: [{
                    name,
                    price,
                    imgs,
                    num: 1
                }],
                cartId: ctx.query.cartId
            }
        }
    },
    computed: {
        //因为list组件中，scope.row.num改变值，也会回流影响cart中的num值，所以可以进行下列计算
        total () {
            let total = 0;
            this.cart.forEach(item => {
                total += item.price * item.num;
            })
            return total;
        }
    },
    methods: {
        async submit () {
            //创建收银台
            const { status, data: { code } } = await this.$axios.post('/cashier/create', {
                params: {
                    detail: [{
                        name: this.cart[0].name,
                        allPrice: this.total
                    }],
                    cashierId: this.cartId

                }
            });
            //获取用户
            const { status: status2, data: { user } } = await this.$axios.get('/users/getUser');
            //将所有能成功提交的订单存为未支付订单
            const { status: status1, data: { code: code1 } } = await this.$axios.post('/order/create', {
                params: {
                    detail: [{
                        name: this.cart[0].name,
                        allPrice: this.total,
                        count: this.total / this.cart[0].price,
                        imgs: this.cart[0].imgs
                    }],
                    user: user,
                    cartId: this.cartId,
                    status: 0  //待付款状态
                }
            });


            if (status === 200 && code === 0 && status1 === 200 && code1 === 0) {
                this.$router.push(`/cashier?cartId=${this.cartId}`)
            } else {
                console.log('error')
            }

        }
    },
    components: {
        'v-List': List
    }
}
</script>

<style lang="scss" scoped>
section {
    margin: 20px auto;
    width: 1000px;
    background: #fff;
    border-radius: 5px;
    .price {
        margin-top: 15px;
        padding: 15px 10px;
        text-align: right;
        font-size: 12px;
        font-weight: bolder;
        color: #666;
        line-height: 30px;
        border-top: 1px solid rgb(240, 240, 240);
        border-bottom: 1px solid rgb(240, 240, 240);
        span {
            font-size: 20px;
            color: #f76120;
        }
    }
    .el-button {
        float: right;
        margin: 30px 10px;
    }
}
</style>