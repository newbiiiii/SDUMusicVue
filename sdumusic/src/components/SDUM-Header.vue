<template>
    <div class="header">
        <div class="container">
            <div class="header-logo">
                <router-link to="/">SDUMusic</router-link>
            </div>
            <div class="header-list">
                <ul>
                    <li v-if="token != null" id="me">
                        <router-link style="display: block; height: 20px" to="/userinfo">
                            <img :src="headicon" style="height: 20px; width: 20px">
                        </router-link>
                        <div class="me-colla">
                            <div><router-link to="/userinfo">个人中心</router-link></div>
                            <div><router-link to="/favourition">收藏夹</router-link></div>
                            <div><router-link to="/userinfo/message">消息中心</router-link></div>
                        </div>
                    </li>
                    <li>
                        <router-link to="/search">搜索</router-link>
                    </li>
                    <div v-if="token == null" style="display: flex">
                        <li>
                            <router-link to="/login">登录</router-link>
                        </li>
                        <li>
                            <router-link to="/register">注册</router-link>
                        </li>
                    </div>

                    <li v-if="token != null" >
                        <a href="javascript:void(0)" @click="quit">退出登录</a>
                    </li>

                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                token: '',
                headicon: ''
            }
        },
        props: {
            a: {
                type: Number,
                default: 0
            }
        },
        mounted() {
            let tmp = localStorage.getItem('token');
            console.log(this.token)
            this.token = tmp == null || tmp === '' ? null : tmp
        },
        methods: {
            quit() {
                this.token = null
                localStorage.removeItem('token')
                this.$router.push('/')
            },
        },

    }
</script>

<style lang="scss" scoped>
    .header{
        position: fixed;
        z-index: 100;
        height: $header-height;
        right: 0;
        left: 0;
        top: 0;
        background-color: rgb(26, 28, 31);
        box-shadow: 0 1px 10px -6px rgba(0,0,0,0.42), 0 1px 10px 0 rgba(0,0,0,0.12), 0 4px 5px -2px rgba(0,0,0,0.1);
    }

    .header .container{
        padding: 10px 0;
        display: flex;
        margin: 0 5%;
        height: 40px;
    }

    .header-logo{
        color: white;
        font-size: 20px;
        line-height: 40px;
        margin-right: auto;
    }

    .header-logo a{
        text-decoration: none;
        color: white;
    }

    .header-list {

    }

    .header-list ul{
        display: flex;
        padding: 0;
        margin: 0;
        height: 40px;
        list-style: none;
    }

    .header-list li{
        line-height: 20px;
        padding: 10px 25px;
        font-size: 12px;
        color: white;
    }

    .header-list a, .header-list router-link{
        text-decoration: none;
        color: white;
        transition: color 1s;
    }

    .header-list a:hover, .header-list router-link:hover{

        color: rgb(51, 209, 255);
    }

    .video-colla, .me-colla{
        visibility: hidden;
        position: absolute;
        z-index: 99;
        width: 84px;
        left: -5px;
        padding-top: 20px;
    }

    .video-colla div, .me-colla div{
        background: $dark-blue;
        padding: 12px 4px;
    }

    #video:hover .video-colla{
        visibility: visible;
    }

    #me:hover .me-colla{
        visibility: visible;
    }

    #video, #me{
        position: relative;
        cursor: pointer;
    }

</style>
