<template>
    <section>
        <el-row>
            <el-col :span='24'>
                <v-curmb :type='type'></v-curmb>
            </el-col>
            <el-col :span='24'>
                <v-info :meta='product'></v-info>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='24'>
                <v-menu :login='login'
                        :list='list'></v-menu>
            </el-col>
        </el-row>
    </section>
</template>

<script>
import curmb from '@/components/detail/curmb'
import info from '@/components/detail/info'
import menu from '@/components/detail/menu'

export default {
    async asyncData (ctx) {
        let { keyword, type } = ctx.query;

        const { status, data: { product, more: list, login } } = await ctx.$axios.get('/search/products', {
            params: {
                city: ctx.store.state.geo.position.city,
                keyword
            }
        });
        if (status === 200) {
            return {
                type,
                product, //信息
                list,   //商家优惠套餐
                login  //是否登录
            }
        } else {
            return {
                type,
                product: {}, //信息
                list: [],   //商家优惠套餐
                login: false  //是否登录
            }
        }
    },
    components: {
        'v-curmb': curmb,
        'v-info': info,
        'v-menu': menu
    }
}
</script>

<style lang="scss" scoped>
</style>