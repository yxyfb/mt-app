<template>
    <section>
        <el-row>
            <el-col :span='4'
                    class='left'>
                <h3>我的美团</h3>
                <dl @click.capture='changeTab'>
                    <dt>我的订单</dt>
                    <dd class='all'>全部订单 {{list.length?list.length:''}}<i class="el-icon-arrow-right"></i></dd>
                    <dd class='unpay'>待付款 {{unpayNum===0?'':unpayNum}}<i class="el-icon-arrow-right"></i></dd>
                    <dd class='unuse'>待使用 {{unuseNum===0?'':unuseNum}}<i class="el-icon-arrow-right"></i></dd>
                    <dd class='unreplay'>待评价<i class="el-icon-arrow-right"></i></dd>
                    <dd class='after'>退款/售后<i class="el-icon-arrow-right"></i></dd>
                </dl>
                <dl>
                    <dt>我的收藏</dt>
                    <dd>收藏的商家<i class="el-icon-arrow-right"></i></dd>
                    <dd>收藏的团购<i class="el-icon-arrow-right"></i></dd>
                </dl>
                <dl>
                    <dt>抵用券</dt>
                    <dd>可用卷<i class="el-icon-arrow-right"></i></dd>
                    <dd>失效卷<i class="el-icon-arrow-right"></i></dd>
                </dl>
                <dl>
                    <dt>个人信息</dt>
                    <dd>账户设置<i class="el-icon-arrow-right"></i></dd>
                </dl>
            </el-col>
            <el-col :span='19'
                    :offset="1"
                    class='right'>
                <el-tabs v-model="activeName">
                    <el-tab-pane label="全部订单"
                                 name="all">
                        <v-List :list='curList'></v-List>
                    </el-tab-pane>
                    <el-tab-pane label="待付款"
                                 name="unpay">
                        <v-List :list='curList'></v-List>
                    </el-tab-pane>
                    <el-tab-pane label="待使用"
                                 name="unuse">
                        <v-List :list='curList'></v-List>
                    </el-tab-pane>
                    <el-tab-pane label="待评价"
                                 name="unreplay">
                        <v-List :list='curList'></v-List>
                    </el-tab-pane>
                    <el-tab-pane label="退款/售后"
                                 name="after">
                        <v-List :list='curList'></v-List>
                    </el-tab-pane>
                </el-tabs>

            </el-col>
        </el-row>
    </section>
</template>

<script>
import List from '@/components/orders/list'

export default {
    data () {
        return {
            activeName: 'all'
        };
    },
    async asyncData (ctx) {
        const { status: status1, data: { user } } = await ctx.$axios.get('/users/getUser');

        const { status, data: { code, list } } = await ctx.$axios.post('/order/getOrder', {
            params: {
                user
            }
        });

        if (status === 200 && code === 0 && list.length > 0) {
            return {
                list: list.map(item => {
                    return {
                        id: item.id,
                        status: item.status,
                        name: item.detail[0].name,
                        allPrice: item.detail[0].allPrice,
                        count: item.detail[0].count,
                        img: item.detail[0].imgs[0].url
                    }
                }),
                curList: list.map(item => {
                    return {
                        id: item.id,
                        status: item.status,
                        name: item.detail[0].name,
                        allPrice: item.detail[0].allPrice,
                        count: item.detail[0].count,
                        img: item.detail[0].imgs[0].url
                    }
                })
            }
        } else {
            return {
                list: [],
                curList: []
            }
        }
    },
    watch: {
        activeName (newVal) {
            if (!this.list) {
                return;
            }
            this.curList = this.list.filter(item => {
                if (newVal === 'all') {
                    return true;
                } else if (newVal === 'unpay') {
                    return item.status === 0;
                } else if (newVal === 'unuse') {
                    return item.status === 1;
                } else if (newVal === 'unreplay') {
                    return item.status === 3;
                } else {
                    return false;
                }
            })
        }
    },
    methods: {
        changeTab (e) {
            const dom = e.target;
            if (dom.tagName === 'DD') {
                this.activeName = dom.className;
            }
        }
    },
    computed: {
        unpayNum () {
            return this.list.filter(item => item.status === 0).length;
        },
        unuseNum () {
            return this.list.filter(item => item.status === 1).length;
        }
    },
    components: {
        'v-List': List
    }
}
</script>

<style lang="scss" scoped>
section {
    padding: 20px 0;
    .el-col {
        padding-top: 30px;
        border: 1px solid #e5e5e5;
        background: #fff;
        border-radius: 5px;
    }
    .left {
        padding-left: 30px;
        padding-right: 20px;
        h3,
        dt {
            padding: 12px 0;
            font-size: 16px;
            color: #222222;
            font-weight: 500;
        }
        dl {
            dd {
                padding-bottom: 15px;
                font-size: 14px;
                color: #666;
                cursor: pointer;
                &:hover {
                    color: #f60;
                }
                i {
                    float: right;
                }
            }
        }
    }
    .right {
        padding-right: 20px;
        padding-left: 20px;
    }
}
</style>