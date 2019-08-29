<template>
    <div class="index">
        <el-row>
            <el-col :span='5'>
                <v-Menu></v-Menu>
            </el-col>
            <el-col :span='19'>
                <v-Life></v-Life>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='24'>
                <v-List></v-List>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Nav from '@/components/index/nav'
import Menu from '@/components/index/menu'
import Life from '@/components/index/life'
import List from '@/components/index/List'

export default {
    components: {
        'v-Nav': Nav,
        'v-Menu': Menu,
        'v-Life': Life,
        'v-List': List
    }
}
</script>

<style lang='scss' scope>
</style>
