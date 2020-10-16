<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="宣传图片" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isEmit: false
    }
  },
  methods: {
    imageLoad() {
      if(!this.isEmit) {
        this.$emit('swiperImageLoad')
        this.isEmit = true
      }
    }
  }
}
</script>

<style scoped>

</style>
