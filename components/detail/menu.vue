<template>
    <div class='menu'>
        <h3>商家团购及优惠</h3>
        <!-- 没有登录 -->
        <div class="nologin"
             v-if='!login'>
            <img src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png">
            <span>请登录后查看详细团购优惠</span>
            <el-button type="warning"
                       round
                       @click='goLogin'>立即登录</el-button>
        </div>

        <!-- 登录 -->
        <div class="login"
             v-else>
            <!-- 登录没商品 -->
            <div class="nomenu"
                 v-if="login &&list.filter(item=>item.photos.length).length===0">
                暂无团购及优惠
            </div>
            <!-- 登录有商品 -->
            <ul v-else>
                <li class='list-header'>{{list.filter(item=>item.photos.length).length}}款套餐</li>
                <li v-for='(item,index) of list.filter(el=>el.photos.length)'
                    :key='index'
                    class='item'>
                    <img :src="item.photos[0].url">
                    <div class="item-info">
                        <h5>{{item.name}}</h5>
                        <p class='num'>已售{{parseInt(Math.random()*1000)}}</p>
                        <p class='price'>
                            <b>￥</b>{{parseInt(item.biz_ext.cost)}}
                            <span>门店价{{parseInt(item.biz_ext.cost)}}</span>
                        </p>
                    </div>
                    <el-button type='warning'
                               round
                               @click='createCart(item)'>立即抢购</el-button>

                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        login: {
            type: Boolean,
            default: false
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        goLogin () {
            this.$router.push('/login')
        },
        //每次都是创建一个新的购物车订单
        async createCart (item) {
            //接收购物车id和code=0
            const { status, data: { code, cartId } } = await this.$axios.post('/cart/create', {
                params: {
                    id: Math.round().toString().slice(3, 9), //商品id
                    detail: [{                        name: item.name,
                        price: item.biz_ext.cost,
                        imgs: item.photos
                    }]
                }
            });

            if (status === 200 && code === 0) {
                //跳转网页，带当前购物车id页面
                this.$router.push({ path: `/cart/?cartId=${cartId}` })
            } else {
                console.log('error');
            }

        }
    }
}
</script>

<style lang="scss" scoped>
.menu {
    margin-top: 40px;
    .nologin,
    .login {
        background: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 5px;
    }
    h3 {
        font-size: 20px;
        font-weight: 700;
        line-height: 26px;
        margin-bottom: 8px;
        color: #222;
    }
    .nologin {
        padding: 30px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
            width: 160px;
            height: 120px;
        }
        span {
            margin: 10px 0 14px;
            color: #666;
            font-size: 16px;
            line-height: 26px;
        }
        .el-button {
            width: 120px;
            height: 40px;
            color: #fff;
        }
    }
    .login {
        padding: 20px 20px 10px;
        li {
            list-style: none;
        }
        .list-header {
            padding-bottom: 20px;
            font-size: 16px;
            line-height: 26px;
        }
        .item {
            display: flex;
            align-items: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #e5e5e5;
            &:last-child {
                border-bottom: none;
            }
            img {
                width: 100px;
                height: 100px;
                margin-right: 20px;
                border-radius: 5px;
                border: 1px solid #e5e5e5;
            }
            .item-info {
                flex: 1;
                h5 {
                    padding-top: 10px;
                    font-size: 16px;
                    line-height: 22px;
                    color: #333;
                    cursor: pointer;
                }
                .num {
                    font-size: 12px;
                    color: #777;
                }
                .price {
                    padding-top: 10px;
                    font-size: 30px;
                    color: #f60;
                    b {
                        font-size: 12px;
                    }
                    span {
                        padding-left: 20px;
                        font-size: 12px;
                        color: #777;
                    }
                }
            }
            .el-button {
                width: 120px;
                height: 40px;
            }
        }
    }
}
</style>