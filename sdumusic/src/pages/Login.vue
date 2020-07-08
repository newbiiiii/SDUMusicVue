<template>
    <div style="position: relative; min-height: 100%; min-height: 100vh">

        <Header/>
        <div id="Login" class="login_form">
            <div id="content">
                <div>
                    <img id="leftimg" src="../assets/imgs/jie.jpg">
                </div>
                <div id="box">
                    <div class="title">登录</div>
                    <div class="login_content">
                        <div>
                            <div class="input">
                                <input type="text" value="" placeholder="账号" v-model="id"/>
                                <br>
                                <input type="password" v-model="password" placeholder="密码"/>
                                <br>
                                <br>
                                <button type="button" class="btn-blue" id="login-button" @click="login">马上登录</button>
                            </div>
                        </div>
                    </div>
                    <br>
                    <br>
                    <br>
                    <router-link id="forgetpass" to='/retrieve'>忘记密码？</router-link>
                    <router-link id="register" to='/register'>注册</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/SDUM-Header'
    import https from "@/https.js"
    import Vue from 'vue'

    export default {
        name: 'Login',
        components: { Header },
        data() {
            return {
                id:'',
                email: '',
                phone:'',
                password: '',
            }
        },
        methods: {
            login() {
                let tmp = {userPwd: this.password, userAccount: this.id};
                let params = JSON.stringify(tmp)
                console.log(params)
                https.fetchJsonPost('/login', params)
                    .then(data => {
                        if (data.data.meta.code==604) {
                            console.log('账号不存在')
                            Vue.prototype.$message.error('账号不存在')
                        }
                        if (data.data.meta.code==605) {
                            console.log('账号或密码错误')
                            Vue.prototype.$message.error('账号或密码错误')
                        }
                        if (data.data.meta.code==200) {
                            console.log('登录成功')
                            Vue.prototype.$message.success('登录成功')
                            let cookies = document.cookie;
                            let st = cookies.indexOf('token') + 6;
                            let token = unescape(cookies.substring(st, cookies.toString().length))
                            localStorage.setItem('token', token)
                            this.$router.push('/')
                        }
                    }).catch(err =>{
                    alert(err.toString())
                })
            }
        }
    }

</script>

<style lang="scss" scoped src=@/assets/scss/login.scss>
</style>
