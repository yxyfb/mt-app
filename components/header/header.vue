<template>
    <div class="header">
        <el-row>
            <el-col :span='24'>
                <v-topBar></v-topBar>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='24'>
                <v-search></v-search>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import topBar from './components/topBar'
import search from './components/search'

export default {
    components: {
        'v-topBar': topBar,
        'v-search': search
    }
}
</script>

<style lang='scss' scope>
</style>