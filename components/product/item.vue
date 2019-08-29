<template>
    <div class="item clearfix">
        <nuxt-link class="item-pic"
                   :to="{path:'detail',query:{keyword:meta.name,type:$route.query.keyword,city:$store.state.geo.position.city}}"> <img v-lazy="meta.img"></nuxt-link>
        <div class="item-info">
            <h4>
                <nuxt-link :to="{path:'detail',query:{keyword:meta.name,type:$route.query.keyword,city:$store.state.geo.position.city}}">{{meta.name}}</nuxt-link>
            </h4>
            <div class="rate">
                <el-rate v-model="meta.rate"
                         disabled
                         text-color="#ff9900">
                </el-rate>
                <span class="item-comment"
                      v-if='meta.rate>4'>很好</span>
                <span class="item-comment"
                      v-else-if='meta.rate>2'>一般</span>
                <span class="item-comment"
                      v-else-if='meta.rate===0'>暂无评分</span>
                <span class="item-comment"
                      v-else>很差</span>
                <span class='item-value'>{{meta.rate}}分</span>
                <span class="item-comment-total">{{ meta.comment }}人评论</span>
            </div>
            <p class="item-type">{{meta.type}}</p>
            <p class='item-price clearfix'>
                <span class="price">人均￥{{ meta.price ||0 }}</span>
                <b>{{ meta.status }}</b>
            </p>
            <ul>
                <li v-if="meta.scene&&meta.scene.length">
                    <span class="detail-type">标签</span>{{ meta.scene }}
                </li>
                <li v-else>
                    <span class="detail-type">通知</span>暂无团购活动
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        meta: {
            type: Object,
            default: () => { }
        }
    }
}
</script>

<style lang="scss" scoped>
.item {
    padding: 20px 0;
    border-top: 1px solid #e5e5e5;

    .item-pic {
        float: left;
        width: 220px;
        height: 125px;
        border-radius: 10px;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .item-info {
        margin-left: 240px;
        h4 {
            a {
                font-weight: 500;
                font-size: 16px;
                color: #333;
                display: block;
            }
        }
        .rate {
            margin-top: 6px;
            .el-rate {
                display: inline-block;
            }
            span {
                padding: 0 10px;
                font-size: 12px;
                &.item-comment-total {
                    color: #ff9900;
                }
            }
        }
        .item-type {
            margin-top: 6px;
            font-size: 12px;
        }
        .item-price {
            height: 30px;
            .price {
                float: left;
                margin-top: 6px;
                color: orange;
            }
            b {
                float: right;
                background: orange;
                color: #fff;
            }
        }
        ul {
            padding-top: 15px;
            border-top: 1px dashed #e5e5e5;
            li {
                list-style-type: none;
                .detail-type {
                    padding: 2px 5px;
                    margin-right: 20px;
                    background: orchid;
                    border-radius: 5px;
                }
            }
        }
    }
}
</style>