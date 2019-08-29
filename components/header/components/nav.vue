<template>
    <div class="nav">
        <ul class="nav-content clearfix">
            <li class="nav-list">
                <nuxt-link to="/my">我的美团</nuxt-link>
                <dl>
                    <dd>
                        <nuxt-link to="/order">我的订单</nuxt-link>
                    </dd>
                    <dd>
                        <nuxt-link to="/order">我的收藏</nuxt-link>
                    </dd>
                    <dd>
                        <nuxt-link to="/order">抵用券</nuxt-link>
                    </dd>
                    <dd>
                        <nuxt-link to="/order">账户设置</nuxt-link>
                    </dd>
                </dl>
            </li>
            <li class="nav-list">
                <nuxt-link to="/phone">手机APP</nuxt-link>
            </li>
            <li class="nav-list">
                <nuxt-link to="/shopCnter">商家中心</nuxt-link>
                <dl>
                    <dd>
                        <nuxt-link to="/order">登录商家中心</nuxt-link>
                    </dd>
                    <dd>
                        <nuxt-link to="/order">美团智能收银</nuxt-link>
                    </dd>
                    <dd>
                        <nuxt-link to="/order">我想合作</nuxt-link>
                    </dd>
                    <dd>
                        <nuxt-link to="/order">手机免费开店</nuxt-link>
                    </dd>
                    <dd>
                        <nuxt-link to="/order">餐饮代理商招募</nuxt-link>
                    </dd>
                    <dd>
                        <nuxt-link to="/order">商家申请开票</nuxt-link>
                    </dd>
                    <dd>
                        <nuxt-link to="/order">免费合作美团排队</nuxt-link>
                    </dd>
                </dl>
            </li>
            <li class="nav-list">
                <nuxt-link to="/">美团规则</nuxt-link>
                <dl>
                    <dd>
                        <nuxt-link to="/order">规则中心</nuxt-link>
                    </dd>
                    <dd>
                        <nuxt-link to="/order">规则目录</nuxt-link>
                    </dd>
                    <dd>
                        <nuxt-link to="/order">规则评议院</nuxt-link>
                    </dd>
                </dl>
            </li>
            <li class="nav-list site">
                <nuxt-link to="/site">网站导航</nuxt-link>
                <div class="siteContainer clearfix">
                    <dl class="hotel">
                        <dt>酒店旅游</dt>
                        <dd>国际机票</dd>
                        <dd>经济型酒店</dd>
                        <dd>公寓</dd>
                        <dd>青年旅社</dd>
                        <dd>农家院</dd>
                        <dd>火车票</dd>
                        <dd>棒果民宿</dd>
                        <dd>主体酒店</dd>
                        <dd>商务酒店</dd>
                        <dd>豪华酒店</dd>
                        <dd>客栈</dd>
                        <dd>度假酒店</dd>
                        <dd>别墅</dd>
                    </dl>
                    <dl class="food">
                        <dt>吃美食</dt>
                        <dd>烤鱼</dd>
                        <dd>特色小吃</dd>
                        <dd>烧烤</dd>
                        <dd>自助餐</dd>
                        <dd>火锅</dd>
                        <dd>代金券</dd>
                    </dl>
                    <dl class="movie">
                        <dt>看电影</dt>
                        <dd>热映电影</dd>
                        <dd>热映影院</dd>
                        <dd>热映电影口碑榜</dd>
                        <dd>最受期待电影</dd>
                        <dd>国内票房榜</dd>
                        <dd>北美票房榜</dd>
                        <dd>电影排行榜</dd>
                    </dl>
                    <dl class="app">
                        <dt>手机应用</dt>
                        <dd>
                            <a href="#"
                               class='img-box'>
                                <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png"
                                     title="美团app"
                                     alt="美团app">
                            </a>
                        </dd>
                        <dd>
                            <a href="#"
                               class='img-box'>
                                <img src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/waimai.png"
                                     title="外卖app"
                                     alt="外卖app">
                            </a>
                        </dd>
                        <dd>
                            <a href="#"
                               class='img-box'>
                                <img src="//s0.meituan.net/bs/fe-web-meituan/404d350/img/appicons/zhenguo.png"
                                     title="棒果app"
                                     alt="棒果app">
                            </a>
                        </dd>
                        <dd>
                            <a href="#"
                               class='img-box'>
                                <img src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/dianping.png"
                                     title="点评app"
                                     alt="点评app">
                            </a>
                        </dd>
                        <dd>
                            <a href="#"
                               class='img-box'>
                                <img src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/maoyan.png"
                                     title="猫眼app"
                                     alt="猫眼app">
                            </a>
                        </dd>
                    </dl>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.nav {
    .nav-content {
        .nav-list {
            position: relative;
            float: left;
            height: 40px;
            width: 20%;
            text-align: center;
            box-sizing: border-box;
            border-left: 1px solid transparent;
            border-right: 1px solid transparent;
            list-style: none;
            > dl,
            .siteContainer {
                position: absolute;
                display: none;
                border: 1px solid #e5e5e5;
                background: #fff;
                text-align: center;
                z-index: 1000;
                right: -1px;
                top: 95%;
                box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;
                box-sizing: content-box;
                > dd {
                    padding: 0 15px;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }

            &.site {
                .siteContainer {
                    width: 1200px;
                    box-sizing: border-box;
                    border-top-left-radius: 4px;
                    padding: 30px 36px 36px 47px;
                    background: #fff;
                    > dl {
                        float: left;
                        dt {
                            margin-bottom: 20px;
                            font-size: 14px;
                            color: #31bbac;
                        }
                        dd {
                            float: left;
                            width: 33%;
                            height: 25px;
                            text-align: center;
                        }
                        &.hotel {
                            width: 20%;
                            margin: 0 30px;
                        }
                        &.food {
                            width: 15%;
                            margin: 0 30px 0 20px;
                        }
                        &.movie {
                            width: 25%;
                            margin: 0 30px;
                        }
                        &.app {
                            width: 20%;
                            dd {
                                height: 70px;
                                text-align: center;
                                .img-box {
                                    display: block;
                                    img {
                                        width: 60px;
                                        height: 60px;
                                        border: 0;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            &:hover {
                background: #fff;
                border-color: #e5e5e5;
                box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
                dl,
                .siteContainer {
                    display: block;
                    border-top: none;
                }
            }
        }
    }
}
</style>
