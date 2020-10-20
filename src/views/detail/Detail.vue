<template>
  <div id="detail">
    <detail-nav-bar id="detail-nav-bar"></detail-nav-bar>
    <scroll ref="scrollComp" class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @loadImgEvent="loadImgEvent"></detail-goods-info>
      <detail-params :param-info="paramInfo" id="detail-params"></detail-params>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends" @imgFinishLoad="loadImgEvent"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParams from "@/views/detail/childComps/DetailParams";
import GoodsList from "@/components/content/goods/GoodsList";

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail";
import Scroll from "@/components/common/scroll/scroll";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import {debounce} from "@/common/utils";

import {itemLinstenerMixin} from "@/common/mixin";

export default {
  name: "Detail",
  components: {
    DetailCommentInfo,
    DetailParams,
    DetailGoodsInfo,
    DetailShopInfo,
    DetailBaseInfo,
    DetailSwiper,
    DetailNavBar,
    GoodsList,
    Scroll
  },
  comments: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParams,
    Scroll
  },
  methods: {
    loadImgEvent() {
      this.$refs.scrollComp.refresh()
    }
  },
  data() {
    return {
      iid: -1,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: () => {}
    }
  },
  created() {
    this.iid = this.$route.params.iid

    getDetail(this.iid).then(res => {
      const data = res.result
      this.topImages = data.itemInfo.topImages

      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      this.shop = new Shop(data.shopInfo)

      this.detailInfo = data.detailInfo

      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);

      if(data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0]
      }

      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    })
  },
  mixins: [itemLinstenerMixin],
  mounted() {
  },
  destroyed() {
    this.$bus.$off('imgFinishLoad',this.itemImgListener)
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
  #detail-params {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
