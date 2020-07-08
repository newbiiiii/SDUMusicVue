<template>
    <div>
        <el-container>
            <el-header>
                <Header/>
            </el-header>
            <el-main>
                <Swiper/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import Header from "@/components/SDUM-Header";
    import Swiper from "@/components/Swiper";

    export default {
        name: "Home",
        components: {Header, Swiper},
        methods: {

        }
    }
</script>

<style scoped>
</style>
