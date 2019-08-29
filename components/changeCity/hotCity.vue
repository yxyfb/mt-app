<template>
    <div class="hotCity">
        <dl>
            <dt>热门城市：</dt>
            <dd v-for='item of items'
                :key='item.id'
                @click='changeCity(item)'>
                {{item.name==='市辖区'?item.province.replace('市',''):item.name.replace('市','')}}
            </dd>
        </dl>
    </div>
</template>

<script>
export default {
    data () {
        return {
            items: []
        }
    },
    async mounted () {
        let { status, data: { hots, code } } = await this.$axios.get('/geo/hotCity');
        if (status === 200 && code === 0) {
            this.items = hots;
        }
    },
    methods: {
        async changeCity (item) {
            const city = item.name === '市辖区' ? item.province.replace('市', '') : item.name.replace('市', '');
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
    }
}
</script>

<style lang="scss" scoped>
.hotCity {
    padding: 30px 0;
    border-bottom: 1px solid #e5e5e5;
    dt {
        font-size: 16px;
        color: #333;
        font-weight: 500;
        display: inline-block;
    }
    dd {
        display: inline-block;
        margin: 0 20px;
        cursor: pointer;
        color: #666;
        &:hover {
            color: #fe8c00;
        }
    }
}
</style>
