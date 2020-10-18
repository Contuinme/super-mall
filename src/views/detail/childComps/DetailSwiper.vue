<template>
  <swiper class="detailSwiper">
    <swiper-item v-for="item in topImages" :key="item">
      <img :src="item" alt="detailSwiper Image">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"

export default {
  name: "detailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.detailSwiper {
  height: 250px;
  overflow: hidden;
}
</style>
