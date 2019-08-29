<template>
    <section class="category">
        <div class="category-component">
            <div class="label">
                <label>分类</label>
                <a href="javascript:;"
                   class='all active'
                   @click='all'>全部</a>
            </div>
            <div class="tags first-tags">
                <div v-for='item of types'
                     :key='item.type'>
                    <a href="javascript:;">
                        <v-Iselect :name='item.type'
                                   :lists='item.module'
                                   @btn='btn'>
                        </v-Iselect>
                    </a>
                </div>
            </div>
        </div>

        <div class="category-component">
            <div class="label">
                <label>区域</label>
                <a href="javascript:;"
                   class='all active'>全部</a>
            </div>
            <div class="tags">
                <div v-for='item of items'
                     :key='item.type'>
                    <a href="javascript:;">
                        <v-Iselect :name='item.type'
                                   :lists='item.module.filter(item=>item!=="")'>
                        </v-Iselect>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Iselect from './iselect'

export default {
    props: {
        items: {
            type: Array,
            default: () => []
        },
        types: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        btn () {
            this.$emit('btn');
        },
        all () {
            this.$emit('all');
        }
    },
    components: {
        'v-Iselect': Iselect
    }
}
</script>

<style lang="scss" scoped>
.category {
    padding: 0 20px;
    border: 1px solid #e5e5e5;
    background: #fff;
    border-radius: 5px;
    .category-component {
        padding-top: 20px;
        .label {
            float: left;
            label {
                display: inline-block;
                width: 80px;
                height: 28px;
                line-height: 28px;
            }
            a {
                display: inline-block;
                margin-right: 40px;
                padding: 0 10px;
                height: 28px;
                line-height: 28px;
                background: linear-gradient(to bottom right, #ffd000, #ffbd00);
                border-radius: 15px;
                color: #222;
            }
        }
        .tags {
            display: inline-block;
            width: 720px;
            padding-bottom: 20px;
            div {
                float: left;
                width: 120px;
            }
            &.first-tags {
                border-bottom: 1px solid #e5e5e5;
            }
        }
    }
}
</style>