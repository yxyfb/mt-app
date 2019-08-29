<template>
    <div class="geo">
        <i class="el-icon-location"></i>{{$store.state.geo.position.city}}
        <nuxt-link to="/changeCity">切换城市</nuxt-link>
        <span>[ {{str}} ]</span>
    </div>
</template>

<script>

export default {

    data () {
        return {
            str: ''
        }
    },
    async mounted () {

        const { status, data: { code, city } } = await this.$axios.get('/geo/city');

        if (status === 200 && code === 0) {
            const startNum = Math.random() * (city.length - 3);

            let arr = city.slice(startNum, startNum + 3).map(item => {
                return {
                    val: item.name.replace('市', '')
                }
            });
            arr.forEach(item => {
                if (item.val.length <= 3) {
                    this.str += item.val + ' ';
                }
            })
        }

    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";
.geo {
    a {
        margin: 0 4px;
        padding: 0 2px;
        background: #f4f4f4;
        border: 1px solid #e5e5e5;
        border-radius: 2px;
        color: $ft;
        &:hover {
            color: $ftcolor-h;
        }
    }
}
</style>
