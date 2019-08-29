<template>
    <div>
        <el-table :data="tableData"
                  style="width: 100%">

            <el-table-column prop="name"
                             label="姓名"
                             width="532">
            </el-table-column>
            <el-table-column prop="price"
                             label="单价"
                             width="132">
            </el-table-column>
            <el-table-column prop="num"
                             label="数量"
                             width='212'>
                <!-- scope.row这一行的变量，可以获取scope.row.price等 -->
                <template slot-scope="scope">
                    <el-input-number v-model="scope.row.num"
                                     size="small"
                                     :min="1"></el-input-number>
                </template>
            </el-table-column>
            <el-table-column label="总价">
                <template slot-scope="scope">
                    {{scope.row.num*scope.row.price}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: {
        tableData: {
            type: Array,
            default: () => [{
                name: "",
                price: 0,
                num: 1
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
</style>