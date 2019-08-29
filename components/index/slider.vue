<template>
    <el-carousel trigger="click"
                 height="240px">
        <el-carousel-item v-for="(item,index) in sliders"
                          :key="index">
            <a :href="item.href">
                <img :src="item.url">
            </a>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    data () {
        return {
            sliders: [{
                url: '//p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg',
                href: '#'
            }, {
                url: '//p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg',
                href: '#'
            }, {
                url: '//p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg',
                href: '#'
            }, {
                url: '//p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png',
                href: '#'
            }, {
                url: '//p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png',
                href: '#'
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
.el-carousel {
    .el-carousel__item {
        a {
            display: block;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>