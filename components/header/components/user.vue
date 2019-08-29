<template>
    <div class="user">

        <div v-if='user'>
            <span>{{user}}</span>
            <nuxt-link class="exit"
                       to="/exit">退出</nuxt-link>
        </div>

        <div v-else>
            <nuxt-link class="login"
                       to="/login">立即登录</nuxt-link>
            <nuxt-link class="register"
                       to="/register">注册</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            user: ''
        }
    },
    async mounted () {
        const { status, data: { user } } = await this.$axios.get('/users/getUser');
        if (status === 200) {
            this.user = user;
        }
    }
}
</script>

<style lang="scss" scoped>
.user {
    .login,
    span {
        color: #fe8c00;
        margin-right: 10px;
    }
}
</style>
