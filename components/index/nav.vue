<template>
    <ul class="nav">
        <li>
            <nuxt-link to='/'
                       class='takeout'>美团外卖</nuxt-link>
        </li>
        <li>
            <nuxt-link to='/'
                       class='takeout'>猫眼电影</nuxt-link>
        </li>
        <li>
            <nuxt-link to='/'
                       class='apartment'>美团酒店</nuxt-link>
        </li>
        <li>
            <nuxt-link to='/'
                       class='apartment'>民宿/公寓</nuxt-link>
        </li>
        <li>
            <nuxt-link to='/'
                       class='business'>商家入驻</nuxt-link>
        </li>
        <li>
            <nuxt-link to='/'
                       class='business'>美团公益</nuxt-link>
        </li>
    </ul>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.nav {
    background: #fff;
    text-align: center;
    li {
        display: inline-block;
        font-size: 0;
        a {
            color: #222;
            font-weight: 700;
            font-size: 16px;
            margin: 0 20px;
            &:hover {
                &.takeout {
                    color: #fbc700;
                }
                &.apartment {
                    color: #ed1e24;
                }
                &.business {
                    color: #fe8c00;
                }
            }
        }
    }
}
</style>
