<template>
    <div class="search">
        <el-row>
            <el-col :span='7'>
                <a href='/'
                   class="mt-logo">
                    <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png"
                         alt="美团">
                </a>
            </el-col>
            <el-col :span='10'>
                <div class="search-box">
                    <el-input v-model="search"
                              placeholder="搜索商家或地点"
                              @focus="focus"
                              @blur="blur"
                              @input='input'>
                    </el-input>
                    <el-button type="warning"
                               icon="el-icon-search"
                               @click='goProduct(search)'>
                    </el-button>
                </div>
                <div class="search-dropdown">
                    <div class="search-noinput"
                         v-if='isNoinput'>
                        <dt>热门搜索</dt>
                        <dd v-for='(item,index) of $store.state.home.hotPlace.slice(0,4)'
                            :key='index'>
                            <a :href="'/product?keyword='+encodeURIComponent(item.name)">{{item.name}}</a>
                        </dd>
                    </div>
                    <ul class="search-hasinput"
                        v-if='isHasinput'>
                        <li v-for='(item,index) of lists'
                            :key='index'>
                            <a :href="'/product?keyword='+encodeURIComponent(item.name)">{{item.name}} · {{item.type}}</a>
                        </li>
                    </ul>
                </div>
                <p class="suggest">
                    <a :href="'/product?keyword='+encodeURIComponent(item.name)"
                       v-for='(item,index) of $store.state.home.hotPlace.slice(0,5)'
                       :key='index'>{{item.name}}</a>
                </p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Loadsh from 'lodash'

export default {
    data () {
        return {
            search: '',
            isFocus: false,
            items: [],
            lists: []
        }
    },
    computed: {
        isNoinput () {
            return this.isFocus && !this.search;
        },
        isHasinput () {
            return this.isFocus && this.search
        }
    },
    created () {
        this.search = this.$route.query.keyword;
    },
    methods: {
        focus () {
            this.isFocus = true;
        },
        blur () {
            //延迟失焦，链接跳转了，再失焦隐藏
            setTimeout(() => {
                this.isFocus = false;
            }, 200)
        },
        input: Loadsh.debounce(async function () {
            let city = this.$store.state.geo.position.city.replace('市', '');
            this.lists = [];

            let { status, data: { code, top } } = await this.$axios.get('/search/top', {
                params: {
                    city,
                    input: this.search
                }
            });

            if (status === 200) {
                if (code === 0) {
                    this.lists = top.slice(0, 10);
                }
            }
        }, 300),
        goProduct (value) {
            this.input = value;
            location.href = `/product?keyword=${encodeURIComponent(value)}`;
        }
    }/* ,
    watch: {
        '$route' (to, from) { //监听路由是否变化
            if (this.$route.query.keyword) {//判断keyword是否有值
                //调数据
                this.search = this.$route.query.keyword;
                this.$router.push()
            }
        }
    } */
}
</script>

<style lang="scss" scope>
.search {
    background: #fff;
    padding-bottom: 35px;
    .el-row {
        width: 1200px;
        margin: 0 auto;
        .el-col:first-child {
            padding: 28px 60px 40px 0;
            a {
                display: block;
                img {
                    width: 126px;
                    height: 46px;
                }
            }
        }

        .el-col:last-child {
            position: relative;
            padding-top: 38px;
            .search-box {
                .el-input {
                    width: 82%;
                    .el-input__inner {
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                    }
                }
                .el-button {
                    position: absolute;
                    top: 38px;
                    right: 0;
                    width: 18%;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
            }
            .search-dropdown {
                position: absolute;
                width: 82%;
                background: #fff;
                z-index: 100;
                .search-noinput {
                    padding: 10px;
                    border: 1px solid #dcdfe6;
                    border-top: none;
                    border-bottom-right-radius: 4px;
                    border-bottom-left-radius: 4px;
                    dt {
                        padding-bottom: 5px;
                        color: #999;
                        font-weight: bold;
                    }
                    dd {
                        display: inline-block;
                        margin: 0 10px 3px 0;
                        font-size: 0;
                        a {
                            font-size: 12px;
                            color: #666;
                            &:hover {
                                color: #fe8c00;
                            }
                        }
                    }
                }
                .search-hasinput {
                    list-style: none;
                    border: 1px solid #dcdfe6;
                    border-top: none;
                    border-bottom-right-radius: 4px;
                    border-bottom-left-radius: 4px;
                    li {
                        a {
                            display: block;
                            padding: 3px 10px;
                            color: #333;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                            &:hover {
                                color: #fe8c00;
                                background: #f8f8f8;
                            }
                        }
                    }
                }
            }
            .suggest {
                padding-top: 5px;
                a {
                    margin: 0 5px;
                }
            }
        }
    }
}
</style>
