<template>
  <div class="SDUM-swiper">
    <el-carousel :interval="4000" type="card" height="280px">
      <el-carousel-item v-for="(item, index) in swiperList" :key="index">
        <img :src="item.picImg"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>

  export default {
    name: 'swiper',
    data () {
      return {
        swiperList: [
          {picImg: require('@/assets/imgs/swiper/blur-1851426_640.jpg')},
          {picImg: require('@/assets/imgs/swiper/concert-768722_640.jpg')},
          {picImg: require('@/assets/imgs/swiper/boy-984293_640.jpg')},
          {picImg: require('@/assets/imgs/swiper/ipad-605439_640.jpg')},
          {picImg: require('@/assets/imgs/swiper/microphone-1209816_640.jpg')},
          {picImg: require('@/assets/imgs/swiper/music-notes-3221097_640.jpg')},
          {picImg: require('@/assets/imgs/swiper/piano-1655558_640.jpg')},
          {picImg: require('@/assets/imgs/swiper/turntable-1337986_640.jpg')}
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .SDUM-swiper {
    width: 90%;
    margin: auto;
    img {
      width: 100%;
    }
  }
</style>
