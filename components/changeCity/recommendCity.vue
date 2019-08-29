<template>
    <section @click.capture='selectCity'>
        <dl>
            <dt>按拼音首字母选择：</dt>
            <dd v-for='item of citys'
                :key='item.title'>
                <a :href="'#city'+item.title">{{item.title}}</a>
            </dd>
        </dl>
        <dl v-for='item of citys'
            :key='item.title'
            class='categroy-city'
            :id="'city'+item.title">
            <dt>{{item.title}}</dt>
            <dd>
                <span v-for='city of item.city'
                      :key='city'>{{city.replace('市','')}}</span>
            </dd>
        </dl>
    </section>
</template>

<script>
import pinyin4js from 'pinyin4js'

export default {
    data () {
        return {
            citys: []
        }
    },
    mounted () {
        this._getAllCitys();
    },
    methods: {
        async selectCity (e) {
            const dom = e.target;
            if (dom.tagName === 'SPAN') {
                const city = dom.innerText;

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
                this.$store.dispatch('setHotPlace', result);
                this.$router.push({ path: '/' })
            }
        },
        async _getAllCitys () {
            let allCitys = [];
            const { status, data: { code, city } } = await this.$axios.get('/geo/city');

            if (status === 200 && code === 0) {
                let d = {};
                let f;
                city.forEach(item => {
                    f = pinyin4js.getShortPinyin(item.name).substring(0, 1).toLocaleUpperCase();
                    if (f) {
                        if (!d[f]) {
                            d[f] = [];
                        }
                        d[f].push(item.name);
                    }
                });
                for (let [k, v] of Object.entries(d)) {
                    allCitys.push({
                        title: k,
                        city: v
                    });
                }
                allCitys.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
                this.citys = allCitys;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
section {
    dl:first-child {
        padding: 20px 0;
        dt {
            font-size: 16px;
            color: #333;
            font-weight: 500;
            display: inline-block;
        }
        dd {
            display: inline-block;
            margin: 0 10px;
            a {
                display: block;
                width: 25px;
                height: 25px;
                line-height: 24px;
                padding-top: 2px;
                box-sizing: border-box;
                text-align: center;
                border-radius: 50%;
                font-size: 15px;
                color: #666;
                &:hover {
                    background: #ddd;
                    color: #fe8c00;
                }
            }
        }
    }

    .categroy-city {
        padding: 13px 10px;
        border-radius: 10px;
        dt {
            box-sizing: border-box;
            vertical-align: top;
            padding-top: 12px;
            display: inline-block;
            text-align: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            color: #222222;
            background: #ffd000;
        }
        dd {
            display: inline-block;
            max-width: 1000px;
            span {
                display: inline-block;
                height: 40px;
                padding-top: 12px;
                margin: 0 10px;
                text-align: center;
                box-sizing: border-box;
                &:hover {
                    cursor: pointer;
                    color: #fe8c00;
                }
            }
        }
        &:hover {
            background: #f5f5f5;
        }
    }
}
</style>