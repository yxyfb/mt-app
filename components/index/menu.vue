<template>
    <div class="menu">
        <dl class="menu-nav"
            @mouseleave="mouseleave">
            <dt>全部分类</dt>
            <dd v-for='(item,index) of $store.state.home.menu'
                :key='index'
                @mouseenter="mouseenter">
                <i :class='item.type'></i>
                <span>{{item.name}}</span>
                <i class='el-icon-arrow-right arrow'></i>
            </dd>
        </dl>
        <div class="menu-detail-wrapper"
             v-if='curDetail'
             @mouseenter="enter"
             @mouseleave="leave">
            <div class="menu-detail"
                 v-for='(item,index) of curDetail.child'
                 :key='index'>
                <h4>{{item.title}}</h4>
                <a href="#"
                   v-for='child of item.child'
                   :key='child'>{{child}}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            hoverType: '',
            /* items: [{
                type: 'food',
                name: '美食',
                child: [{
                    title: '美食',
                    child: ['代金券', '甜品饮品', '火锅']
                }, {
                    title: '美食1',
                    child: ['代金券1', '甜品饮品1', '火锅1']
                }]
            }, {
                type: 'foo',
                name: '美食 / 机票',
                child: [{
                    title: '美食',
                    child: ['代金券', '甜品饮品', '火锅']
                }]
            }] */
        }
    },
    computed: {
        curDetail () {
            return this.$store.state.home.menu.filter(item => item.type === this.hoverType)[0];
        }
    },
    methods: {
        mouseenter (e) {
            this.hoverType = e.target.querySelector('i').className;
        },
        mouseleave () {
            this.timer = setTimeout(() => {
                this.hoverType = '';
            }, 200);
        },
        enter () {
            clearTimeout(this.timer);
        },
        leave () {
            this.hoverType = '';
        }
    }
}
</script>

<style lang="scss" scoped>
.menu {
    width: 230px;
    height: 475px;
    position: relative;
    margin-top: -50px;
    color: #646464;
    background: #fff;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
    text-align: left;
    box-sizing: border-box;
    .menu-nav {
        padding: 10px 0 8px;
        dt {
            height: 50px;
            padding-top: 15px;
            box-sizing: border-box;
            font-size: 16px;
            margin-left: 15px;
            color: #222222;
            font-size: 16px;
            font-weight: 700;
        }
        dd {
            position: relative;
            box-sizing: border-box;
            padding: 2px 12px;
            height: 26px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            cursor: pointer;
            span {
                flex: 1;
                padding-left: 12px;
                text-align: left;
            }
            i {
                line-height: 22px;
            }
            .arrow {
                color: #ccc;
            }
            &:hover {
                background: rgba(255, 150, 0, 0.08);
                color: #222;
                font-weight: 500;
                .arrow {
                    color: #222;
                }
            }
        }
    }
    .menu-detail-wrapper {
        position: absolute;
        top: 60px;
        left: 230px;
        width: 400px;
        height: 416px;
        padding: 0 30px;
        box-sizing: border-box;
        background: #fff;
        z-index: 100;
        h4 {
            margin-top: 24px;
            padding-bottom: 10px;
            font-size: 16px;
            font-weight: 500;
            color: #222;
            cursor: pointer;
            border-bottom: 1px solid #e5e5e5;
        }
        a {
            color: #999;
            font-size: 12px;
            line-height: 15px;
            display: inline-block;
            margin-right: 16px;
            margin-top: 10px;
            cursor: pointer;
            &:hover {
                color: #fe8c00;
            }
        }
    }
}
</style>
