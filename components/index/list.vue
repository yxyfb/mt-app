<template>
    <div class="list">
        <dl @mouseover="mouseover">
            <dt>有格调</dt>
            <dd class="nav-item"
                :class="{active:kind==='all'}"
                kind='all'
                keyword='全部'>全部</dd>
            <dd class="nav-item"
                :class="{active:kind==='part'}"
                kind='part'
                keyword='美食'>约会聚餐</dd>
            <dd class="nav-item"
                :class="{active:kind==='spa'}"
                kind='spa'
                keyword='丽人'>丽人SPA</dd>
            <dd class="nav-item"
                :class="{active:kind==='movie'}"
                kind='movie'
                keyword='电影'>电影演出</dd>
            <dd class="nav-item"
                :class="{active:kind==='travel'}"
                kind='travel'
                keyword='旅游'>品质出游</dd>
        </dl>

        <ul class="list-body clearfix">
            <li v-for='(item,index) of list[kind]'
                :key='index'>
                <a :href="item.url">
                    <img v-lazy="item.img"
                         alt="">
                    <p class="item-name">{{item.title}}</p>
                    <p class="item-des">{{item.pos}}</p>
                    <p class="item-price"><i class="item-price-icon">￥</i>{{item.price}}</p>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            kind: 'all',
            list: {
                all: [/* {
                    url: '#',
                    img: '//p1.meituan.net/bbia/17b66a4f2d34fcb25917218901e6d1e3442420.png@368w_208h_1e_1c',
                    title: '爱达乐蛋糕 (天府广场店)',
                    pos: '蛋糕3选1，约6英寸，圆形',
                    price: '152.3'
                } */],
                part: [],
                spa: [],
                movie: [],
                travel: []
            }
        }
    },
    mounted () {
        this._getList('全部');
    },
    methods: {
        async mouseover (e) {
            let dom = e.target;
            let tag = dom.tagName.toLowerCase();
            if (tag === 'dd') {
                this.kind = dom.getAttribute('kind');

                let keyword = dom.getAttribute('keyword');
                this._getList(keyword)
            }
        },
        async _getList (val) {
            const city = this.$store.state.geo.position.city.replace('市', '');
            let { status, data: { pois, count } } = await this.$axios.get('/search/resultsByKeywords', {
                params: {
                    city,
                    keyword: val
                }
            });

            if (status === 200 && count > 0) {
                let r = pois.filter(item => item.photos.length > 0).map(item => {
                    return {
                        url: '#',
                        img: item.photos[0].url,
                        title: item.name,
                        pos: item.type.split(';')[0],
                        price: item.biz_ext.cost || '暂无'
                    }
                });
                this.list[this.kind] = r.slice(0, 9);
            } else {
                this.list[this.kind] = [];
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.list {
    margin: 40px 0;
    dl {
        height: 44px;
        line-height: 44px;
        background-image: linear-gradient(
            to right,
            rgb(194, 176, 142) 3%,
            rgb(190, 164, 116) 100%
        );
        color: #fff;
        dt {
            float: left;
            font-size: 18px;
            margin-left: 13px;
            margin-right: 10px;
        }
        dd {
            float: left;
            padding: 0 5px;
            position: relative;
            cursor: pointer;
            text-transform: uppercase;
            &.active {
                &:after {
                    position: absolute;
                    content: "";
                    display: block;
                    width: 2px;
                    height: 0;
                    top: 37px;
                    left: 0;
                    right: 0;
                    margin: auto;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-bottom: 7px solid #fff;
                }
            }
        }
    }

    .list-body {
        padding: 10px;
        border: 1px solid rgb(229, 229, 229);
        list-style: none;
        li {
            float: left;
            a {
                display: block;
                padding: 12px;
                img {
                    width: 368px;
                    height: 208px;
                    border-radius: 5px;
                    margin-bottom: 11px;
                }
                .item-name {
                    font-size: 16px;
                    color: #222;
                    height: 22px;
                    line-height: 22px;
                    margin-bottom: 8px;
                    font-weight: 500;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .item-pos {
                    font-size: 12px;
                    color: #999;
                    line-height: 18px;
                    height: 18px;
                    margin-bottom: 7px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .item-price {
                    font-size: 22px;
                    color: #be9e4d;
                    margin-right: 6px;
                    letter-spacing: -0.8px;
                    .item-price-icon {
                        font-size: 12px;
                    }
                }
            }
            &:hover {
                background: #ffff;
            }
        }
    }
}
</style>
