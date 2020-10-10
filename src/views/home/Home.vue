<template>
  <div>
    <nav-bar class="home-nav"><div slot="center">不拿钱就拿命购物站</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommend="recommends"></home-recommend-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import HomeSwiper from "@/views/home/ChildComps/HomeSwiper";
import HomeRecommendView from "@/views/home/ChildComps/HomeRecommendView";

import {getHomeMultidata} from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  data(){
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
