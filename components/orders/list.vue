<template>
    <ul>
        <li v-if='list.length===0'>没有订单</li>
        <li v-for='item of list'
            :key='item.id'>
            <img :src="item.img"
                 alt="">
            <div class="item-info">
                <h4>{{item.name}}</h4>
                <span>数量：{{item.count}}</span>
            </div>
            <div class="item-price">总价：￥{{item.allPrice}}</div>
            <div class="item-status">{{item.status===0?'未付款':'已付款'}}</div>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style lang="scss" scoped>
ul {
    padding-top: 5px;
    li {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #e5e5e5;
        & + li {
            padding-top: 20px;
        }
        &:last-child {
            border-bottom: none;
        }
        img {
            width: 90px;
            height: 90px;
            margin-right: 15px;
            border-radius: 5px;
        }
        .item-info {
            width: 300px;
            height: 90px;
            h4 {
                margin: 18px 0 8px;
                font-size: 16px;
                color: #222222;
                font-weight: 500;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 300px;
            }
            span {
                font-size: 12px;
                color: #666666;
            }
        }
        .item-price,
        .item-status {
            margin-left: 60px;
            font-size: 12px;
            color: #666666;
        }
    }
}
</style>