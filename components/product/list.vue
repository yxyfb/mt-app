<template>
    <section>
        <dl class='clearfix'>
            <dd v-for='(item,index) of nav'
                :key='index'
                @click.stop='navSelect(item.name,index)'
                :class="[item.name,item.active?'s-nav-active':'']">{{item.text}} </dd>
        </dl>

        <div v-if='oldList.length'>
            <v-Item v-for='(item,index) of oldList'
                    :key='index'
                    :meta='item'
                    class='items'
                    ref='item'></v-Item>
        </div>
    </section>
</template>

<script>
import Item from './item'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            oldList: [],
            nav: [
                {
                    name: 's-default',
                    text: '智能排序',
                    active: true
                }, {
                    name: 's-price',
                    text: '价格最低',
                    active: false
                }, {
                    name: 's-visit',
                    text: '人气最高',
                    active: false
                }, {
                    name: 's-comment',
                    text: '评价最高',
                    active: false
                }
            ]
        }
    },
    created () {

        this.list.forEach((item) => {
            this.oldList.push(item);
        })
    },
    mounted () {
        this.arrH = [];
        document.querySelectorAll('.items').forEach(item => {
            this.arrH.push([item.offsetTop + item.offsetParent.offsetTop, item.offsetHeight]);
        })

        //页面一刷新，就获取第一个商品的地理位置
        this.$store.dispatch('setLocation', this.$refs.item[0].meta.location.split(',').map(Number));
    },
    computed: {
        ...mapGetters([
            'categoryText'
        ])
    },
    watch: {
        scrollTop (newTop) {

            //h[0]是每个item到页面顶部的距离，h[1]是每个item高度
            this.arrH.forEach((h, index) => {
                //如果滚动高度+50大于当前item距离顶部高度
                //并且  当前滚动高度-当前item到顶部距离-当前item高度小于0，则触发
                if (newTop + 50 > h[0] && newTop - h[0] - h[1] < 0) {
                    // console.log(this.$refs.item[index].meta.location)
                    this.$store.dispatch('setLocation', this.$refs.item[index].meta.location.split(',').map(Number));
                }
            })
        }
    },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        scrollTop: {
            type: Number,
            default: null
        }
    },
    components: {
        'v-Item': Item
    },
    methods: {
        navSelect (name, index) {
            this.nav.forEach(item => {
                item.active = false;
            })
            this.nav[index].active = true;

            if (name === 's-default') {
                this._default();
            }
            if (name === 's-price') {
                this._price();
            }
            if (name === 's-visit') {
                this._visit();
            }
            if (name === 's-comment') {
                this._comment();
            }
        },
        btn () {
            this.oldList = [];

            this.list.filter(item => {
                return item.type.indexOf(this.categoryText) > -1
            }).forEach((item) => {
                this.oldList.push(item);
            })
        },
        all () {
            this.oldList = [];
            this.list.forEach((item) => {
                this.oldList.push(item);
            })
        },
        _default () {
            this.btn();
        },
        _price () {
            this.oldList.sort((a, b) => {
                return a.price - b.price;
            })
        },
        _visit () {
            this.oldList.sort((a, b) => {
                return b.comment - a.comment;
            })
        },
        _comment () {
            this.oldList.sort((a, b) => {
                return b.rate - a.rate;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
section {
    margin-top: 15px;
    padding: 0 20px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    background: #fff;
    dl {
        padding: 15px 0;
        dd {
            float: left;
            width: 96px;
            height: 20px;
            line-height: 20px;
            color: #666;
            cursor: pointer;
            &.s-nav-active {
                color: #222;
            }
        }
    }
}
</style>