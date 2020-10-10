<template>
  <div>
    <nav-bar class="home-nav"><div slot="center">不拿钱就拿命购物站</div></nav-bar>
    <h1>首页</h1>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar
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
