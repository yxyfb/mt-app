<template>
    <el-row :gutter="0">
        <el-col :span="5">
            <v-Geo></v-Geo>
        </el-col>
        <el-col :span="11">
            <v-User></v-User>
        </el-col>
        <el-col :span="8">
            <v-Nav></v-Nav>
        </el-col>
    </el-row>
</template>

<script>
import Geo from './geo'
import User from './user'
import Nav from './nav'

export default {
    components: {
        'v-Geo': Geo,
        'v-User': User,
        'v-Nav': Nav
    }
}
</script>

<style lang="scss" scoped>
.el-row {
    width: 1200px;
    margin: 0 auto !important;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #999;
}
</style>
