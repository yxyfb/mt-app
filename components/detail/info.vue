<template>
    <div class='info'>
        <div class="text-info">
            <h3>{{meta.name}}</h3>
            <div class="rate">
                <el-rate v-model='rate'
                         disabled
                         text-color="#ff9900">
                </el-rate>
                <span>{{rate}}分</span>
                <span>人均{{meta.biz_ext.cost}}￥</span>
            </div>
            <div class="shop-info">
                <p class="address">地址：{{meta.address}}</p>
                <p class="tel">电话：{{meta.tel}}</p>
                <p class="time">营业时间：早上10点到晚上10点</p>
            </div>
            <ul class="tags clearfix">
                <li>
                    <img src="//p0.meituan.net/codeman/551290739062eda37e52999e2315f50c1887.png">
                    提供wifi
                </li>
                <li>
                    <img src="//p1.meituan.net/codeman/4b1c5696fe5bf2c4d23fb01659b3e68b1960.png">
                    提供wifi
                </li>
            </ul>
        </div>
        <div class="pic-info">
            <img :src="meta.photos[0].url">
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
    },
    computed: {
        rate () {
            return Number(this.meta.biz_ext.rating);
        }
    }
}
</script>

<style lang="scss" scoped>
.info {
    display: flex;
    padding: 20px;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    .text-info {
        flex: 1;
        h3 {
            font-size: 26px;
            font-weight: 700;
            color: #222;
        }
        .rate {
            padding: 15px 0;
            border-bottom: 1px solid #e5e5e5;
            .el-rate {
                display: inline-block;
            }
            span {
                font-size: 12px;
                color: #555;
                vertical-align: middle;
            }
        }
        .shop-info {
            padding-top: 10px;
            border-bottom: 1px solid #e5e5e5;
            p {
                padding-bottom: 10px;
                color: #555;
            }
        }
        .tags {
            padding-top: 20px;
            li {
                float: left;
                display: flex;
                flex-direction: column;
                list-style-type: none;
                align-items: center;
                margin-right: 15px;
                img {
                    padding-bottom: 10px;
                    width: 24px;
                    height: 24px;
                }
            }
        }
    }
    .pic-info {
        margin-left: 20px;
        width: 380px;
        height: 240px;
        border: 1px solid #e5e5e5;
        border-radius: 10px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>