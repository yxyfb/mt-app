<template>
    <el-row class='product'>
        <el-col :span='19'>
            <v-Crumb :keyword='keyword'></v-Crumb>
            <v-Category :items='areas'
                        :types='types'
                        @btn='btn'
                        @all='all'
                        id='category'></v-Category>
            <v-List :list='list'
                    ref='list'
                    :scrollTop='scrollTop'></v-List>
        </el-col>
        <el-col :span='5'>
            <v-Map :class="{'map-fixed':active}"></v-Map>
        </el-col>
    </el-row>
</template>

<script>
import Lodash from 'lodash'

import Crumb from '@/components/product/crumb'
import Category from '@/components/product/category'
import List from '@/components/product/list'
import myMap from '@/components/product/map'

export default {
    name: 'product',
    data () {
        return {
            active: false,
            scrollTop: null
        }
    },
    async asyncData (ctx) {
        let keyword = ctx.query.keyword || '';//获取url中的keyword
        let city = ctx.store.state.geo.position.city;

        //获取搜索结果列表,count多少个，pois商品详情数组
        const { status, data: { count, pois } } = await ctx.$axios.get('search/resultsByKeywords', {
            params: {
                city,
                keyword
            }
        });
        //获取分类和区域
        const { status: status1, data: { areas, types } } = await ctx.$axios.get('category/crumbs', {
            params: {
                city
            }
        })
        if (status === 200 && count > 0 && status1 === 200) {
            if (pois.length === 0) {
                return;
            }

            /* --------获取分类--- */
            const allTypes = []
            let t = {};
            let f;
            pois.forEach(item => {
                if (item.type) {
                    const arr = item.type.split(';');
                    f = arr[0];
                    if (!t[f]) {
                        t[f] = [];
                    }
                    for (let i = 0; i < arr.length; i++) {
                        if (i !== 0) {
                            if (t[f].indexOf(arr[i]) < 0) {
                                t[f].push(arr[i]);
                            }
                        }
                    }
                }
            })

            for (let [k, v] of Object.entries(t)) {
                allTypes.push({
                    type: k,
                    module: v
                })
            }



            return {
                keyword,
                areas: areas.filter(item => item.type !== '') || [],   //地区
                types: allTypes,
                list: pois.filter(item => item.photos.length).map(item => {
                    return {
                        type: item.type,
                        img: item.photos[0].url,
                        name: item.name,
                        comment: Math.floor(Math.random() * 10000),//随机定义的人气
                        rate: Number(item.biz_ext.rating),
                        scene: item.tag, //商品标签
                        tel: item.tel,
                        status: '可订明日',
                        price: Number(item.biz_ext.cost),
                        location: item.location, //经纬度
                        module: item.type.split(';')[0]
                    }
                })

            }
        }
    },
    mounted () {
        this.firstH = document.querySelector('#category').offsetTop + document.querySelector('#category').offsetParent.offsetTop;
        window.addEventListener('scroll', Lodash.debounce(this.hanldScroll, 100));
    },
    methods: {
        btn () {
            this.$refs.list.btn();
        },
        all () {
            this.$refs.list.all();
        },
        hanldScroll () {
            this.scrollTop = document.documentElement.scrollTop;
            if (this.scrollTop > this.firstH) {
                this.active = true;
            } else {
                this.active = false;
            }

        }
    },
    components: {
        'v-Crumb': Crumb,
        'v-Category': Category,
        'v-List': List,
        'v-Map': myMap
    }
}
</script>

<style lang="scss" scoped>
.map-fixed {
    position: fixed !important;
    top: 0;
    margin-left: 10px !important;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.5);
}
</style>