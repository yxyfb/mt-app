<template>
    <el-container>
        <el-header height="auto">
            <v-Header></v-Header>
        </el-header>
        <el-main>
            <nuxt />
        </el-main>
        <el-footer>
            <v-Footer></v-Footer>
        </el-footer>
    </el-container>
</template>

<script>
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'

export default {
    components: {
        'v-Header': Header,
        'v-Footer': Footer
    }
}
</script>

<style lang="scss" scope>
.el-header,
.el-main {
    padding: 0;
}

.el-main {
    width: 1200px;
    margin: 0 auto;
    overflow: visible;
}
</style>

