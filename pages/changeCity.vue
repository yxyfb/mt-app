<template>
    <div class="changeCity">
        <el-row>
            <el-col :span='24'>
                <v-iselect></v-iselect>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='24'>
                <v-hotCity></v-hotCity>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='24'>
                <v-recommendCity></v-recommendCity>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Iselect from '@/components/changeCity/iselect'
import hotCity from '@/components/changeCity/hotCity'
import recommendCity from '@/components/changeCity/recommendCity'

export default {
    components: {
        'v-iselect': Iselect,
        'v-hotCity': hotCity,
        'v-recommendCity': recommendCity
    }
}
</script>

<style lang="scss" scoped>
.changeCity {
    padding: 0 20px;
    margin: 20px 0;
    background: #fff;
    border: 1px solid #e5e5e5;
}
</style>
