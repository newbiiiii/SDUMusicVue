<template>
    <div>
        <el-container>
            <el-header>
                <Header/>
            </el-header>
            <el-main>
                <Swiper/>
                <div class="song-list">
                    <ul class="song-list-header">
                        <li v-for="(item, index) in songStyle"
                            :key="index"
                            :class="{active: item.name === activeName}"
                            @click="handleChangeView(item.name)">
                            {{item.name}}
                        </li>
                    </ul>
                    <div class="song-content">
                        <div class="content-list">
                            <ul class="section-content">
                                <li class="content-item" v-for="(item, index) in datas" :key="index">
                                    <div>
                                        <img class="item-img" src="../assets/imgs/jie.jpg" alt="">
                                        <div class="mask"></div>
                                    </div>
                                    <p class="item-name">{{item.songListTitle}}</p>
                                </li>
                            </ul>
                        </div>
                        <div class="pagination">
                            <el-pagination
                                    @current-change="handleCurrentChange"
                                    background
                                    layout="total, prev, pager, next"
                                    :current-page="currentPage"
                                    :page-size="pageSize"
                                    :total="albumDatas.length">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import Header from "@/components/SDUM-Header";
    import Swiper from "@/components/Swiper";
    import https from "@/https.js"

    export default {
        name: "Home",
        components: {Header, Swiper},
        methods: {
            handleCurrentChange (val) {
                this.currentPage = val
            },
            getSongList() {
                https.fetchGet('/songList').then(data => {
                    this.albumDatas = data.data.data;
                })
            },
            handleChangeView: function (name) {
                this.activeName = name
                this.albumDatas = []
                if (name === '全部歌单') {
                    this.getSongList()
                } else {
                    this.getSongListOfStyle(name)
                }
            },
            getSongListOfStyle (style) {
                let param = {style: style};
                https.fetchGet('/songList/style', param)
                    .then(data => {
                        this.currentPage = 1
                        this.albumDatas = data.data.data;
                    })
            },
        },
        created() {
            this.getSongList()
        },
        data () {
            return {
                songStyle: [
                    {name: '全部歌单', type: 'One'},
                    {name: '华语', type: 'Two'},
                    {name: '粤语', type: 'Three'},
                    {name: '欧美', type: 'Four'},
                    {name: '日韩', type: 'Five'},
                    {name: '轻音乐', type: 'Six'},
                    {name: 'BGM', type: 'Seven'},
                    {name: '乐器', type: 'Eight'}
                ],
                activeName: '全部歌单',
                pageSize: 15,
                currentPage: 1,
                albumDatas: []
            }
        },
        computed: {
            datas () {
                return this.albumDatas.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .song-list {
        margin: 30px 150px;
        padding-bottom: 50px;
        min-width: 800px;
        background-color: #ffffff;
    }
    .song-list-header {
        width: 100%;
        padding: 0 40px;
        li {
            display: inline-block;
            line-height: 40px;
            margin: 40px 20px 15px 20px;
            font-size: 20px;
            font-weight: 400;
            color: #67757f;
            border-bottom: none;
            cursor: pointer;
        }
        li.active {
            color: #000000;
            font-weight: 600;
            border-bottom: 4px solid #000000;
        }
    }

    .content-list {
        min-height: 500px;
        padding: 0 20px;
        .section-content {
            display: flex;
            justify-content: flex-start;
            align-items: stretch;
            flex-direction: row;
            flex-wrap: wrap;
        }
    }
    .content-item {
        width: 18%;
        margin: 20px 1%;
        overflow: hidden;
        border-radius: 4px;
        -webkit-box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
        position: relative;
        &:hover {
            -webkit-box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
            -moz-box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
            box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
        }
        &:hover .item-img {
            transform: scale(1.1);
        }
        .item-name {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            margin: 10px 8px;
        }
    }
    .item-img {
        width: 100%;
        transition: all 0.4s ease;
    }
    .mask {
        width: 100%;
        padding-bottom: 100%;
        height: 0;
        overflow: hidden;
    }
    .mask {
        width: 100%;
        padding-bottom: 100%;
        height: 0;
        overflow: hidden;
        position: absolute;
        top: 0;
        background-color: rgba(52, 47, 41, 0.4);
        transition: all 0.3s ease-in-out;
        opacity: 0;
        display: flex;
        justify-content: center;
        > .icon {
            position: absolute;
            top: 40%;
        }
        &:hover {
            opacity: 1;
            cursor: pointer;
        }
    }
    .icon {
        width: 2em;
        height: 2em;
        font-size: 2em;
        color: rgba(240, 240, 240, 1);
        fill: currentColor;
        overflow: hidden;
        position: relative;
    }

</style>
