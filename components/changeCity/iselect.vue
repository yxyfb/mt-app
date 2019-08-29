<template>
    <div class="iselect">
        <span class="name">按省份选择：</span>
        <el-select v-model="pvalue"
                   placeholder="省份">
            <el-option v-for="item in province"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="cvalue"
                   placeholder="城市"
                   :disabled='active'
                   @change="handleSelectCity">
            <el-option v-for="item in city"
                       :key="item.value"
                       :label="item.label"
                       :value="item.label">
            </el-option>
        </el-select>
        <span class="serchCity name">直接搜索：</span>
        <el-autocomplete v-model="state"
                         :fetch-suggestions="querySearchAsync"
                         placeholder="请输入城市或拼音"
                         @select="handleSelect"></el-autocomplete>
    </div>
</template>

<script>
import Loadsh from 'lodash'
import pinyin4js from 'pinyin4js'
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            province: [],
            pvalue: '',
            city: [],
            cvalue: '',
            active: true,
            state: '',
            allCitys: []     //全国所有城市
        }
    },
    watch: {
        async pvalue (newval) {
            if (newval !== '') {
                this.active = false;
                let { status, data: { city } } = await this.$axios.get(`/geo/prevince/${newval}`);

                if (status === 200) {
                    this.city = city.map(item => {
                        return {
                            label: item.name,
                            value: item.id
                        }
                    })
                    this.cvalue = '';  //每次切换省份后，显示城市都清空
                }
            } else {
                this.active = true;
                this.city = []
            }
        }
    },
    mounted () {

        this._getProvince(); //获取所有省份
        this._getCity();   //获取所有城市
    },
    methods: {
        //输入地址搜索内容
        querySearchAsync: Loadsh.debounce(async function (query, cb) {//input用户输入的state
            //如果是拼音首字母搜索，就在item.pinyin里面找，最终找到后elementUI组件返回的是value值
            if (query.charCodeAt() >= 32 && query.charCodeAt() <= 126) {
                this._getCity(cb(this.allCitys.filter(item => item.pinyin.indexOf(query) > -1)));
            } else {//汉字搜索，就在iten,vlaue里面找
                this._getCity(cb(this.allCitys.filter(item => item.value.indexOf(query) > -1)));
            }
        }, 200),

        //点击直接搜索选项时触发
        async handleSelect (item) {
            this.$store.dispatch('setPosition', { city: item.value });
            const {
                status,
                data: {
                    result
                }
            } = await this.$axios.get('/search/hotPlace', {
                params: {
                    city: item.value.replace('市', '')
                }
            });

            this.setHotPlace(result);
            this.$router.push({ path: '/' })
        },

        //按省份选择城市触发
        async handleSelectCity () {
            const city = this.cvalue === '市辖区' ? this.province.filter(item => item.value === this.pvalue)[0].label.replace('市', '') : this.cvalue.replace('市', '');

            const {
                status,
                data: {
                    result
                }
            } = await this.$axios.get('/search/hotPlace', {
                params: {
                    city
                }
            });

            this.$store.dispatch('setPosition', { city });
            this.setHotPlace(result);
            this.$router.push({ path: '/' })
        },

        async _getCity (callback) {
            if (this.allCitys.length) {
                callback;
            } else {
                let { status, data: { code, city } } = await this.$axios.get('/geo/city');
                if (status === 200 && code === 0) {
                    this.allCitys = city.map(item => {
                        return {
                            value: item.name,
                            province: item.province,
                            pinyin: pinyin4js.getShortPinyin(item.name)  //存入每个城市首字母拼音
                        }
                    });
                    callback;
                } else {
                    cb([]);//失败就返回空
                }
            }
        },

        async _getProvince () {
            let { status, data: { code, prevince } } = await this.$axios.get('/geo/prevince');

            if (status === 200 && code === 0) {
                this.province = prevince.map(item => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })
            }
        },

        ...mapActions([
            'setHotPlace'
        ])
    }
}
</script>

<style lang="scss" scoped>
.iselect {
    padding: 30px 0;
    border-bottom: 1px solid #e5e5e5;
    .name {
        font-size: 16px;
        color: #333;
        font-weight: 500;
        display: inline-block;
        &.serchCity {
            margin-left: 40px;
        }
    }
}
</style>
