<template>
  <div id="detail">
    <detail-nav-bar id="detail-nav-bar"></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";

import {getDetail,Goods,Shop} from "@/network/detail";
import Scroll from "@/components/common/scroll/scroll";

export default {
  name: "Detail",
  components: {DetailShopInfo, Scroll, DetailBaseInfo, DetailSwiper, DetailNavBar},
  comments: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll
  },
  data() {
    return {
      iid: -1,
      topImages: [],
      goods: {},
      shop: {}
    }
  },
  created() {
    this.iid = this.$route.params.iid

    getDetail(this.iid).then(res => {
      const data = res.result
      this.topImages = data.itemInfo.topImages

      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      this.shop = new Shop(data.shopInfo)
    })
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  #detail-nav-bar {
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>
