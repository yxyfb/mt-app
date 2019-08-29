<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">{{$store.state.geo.position.city.replace('市','')}}美团</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">{{$store.state.geo.position.city.replace('市','')}}{{keyword}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    props: {
        keyword: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
    padding: 20px 0;
    .el-breadcrumb__item {
        font-size: 12px;
    }
}
</style>