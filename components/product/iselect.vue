<template>
    <dl class="tab">
        <dt>{{name}}<i class="el-icon-caret-bottom"></i></dt>
        <dd @click.capture='btn'>
            <h3>{{name}}</h3>
            <span v-for='(list,index) of lists'
                  :key='index'>{{list}}</span>
        </dd>
    </dl>
</template>

<script>
export default {

    props: {
        name: {
            type: String,
            default: ''
        },
        lists: {
            type: Array,
            default: () => []
        }
    },

    methods: {
        btn (e) {
            const dom = e.target;
            if (dom.tagName === 'SPAN') {
                this.$store.dispatch('setCategoryText', dom.innerText);
                this.$emit('btn');
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.tab {
    dt {
        padding-bottom: 5px;
        height: 28px;
        line-height: 28px;
        color: #666;
        i {
            padding-left: 5px;
        }
    }

    dd {
        display: none;
        position: absolute;
        padding: 19px 15px;
        max-width: 490px;
        border: 1px solid #e5e5e5;
        border-radius: 5px;
        box-shadow: 0 0 3px 0 #e5e5e5;
        background: #fff;
        h3 {
            color: #ccc;
            font-size: 16px;
            margin-bottom: 11px;
            cursor: default;
        }
        span {
            display: inline-block;
            min-width: 120px;
            height: 18px;
            line-height: 18px;
        }
        &:before {
            content: "";
            position: absolute;
            height: 0;
            width: 0;
            border: 8px solid transparent;
            border-bottom-color: #e5e5e5;
            top: -16px;
            left: 7px;
        }
        &:after {
            content: "";
            position: absolute;
            height: 0;
            width: 0;
            border: 8px solid transparent;
            border-bottom-color: #fff;
            top: -14px;
            left: 7px;
        }
    }

    &:hover {
        dd {
            display: block;
        }
    }
}
</style>