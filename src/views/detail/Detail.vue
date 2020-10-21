<template>
  <div id="detail">
    <detail-nav-bar ref="nav" id="detail-nav-bar" @itemClick="itemClick"></detail-nav-bar>
    <scroll ref="scrollComp" class="content" :probeType="3" @scroll="scrollListener">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @loadImgEvent="loadImgEvent"></detail-goods-info>
      <detail-params ref="param" :param-info="paramInfo" id="detail-params"></detail-params>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends" @imgFinishLoad="loadImgEvent"></goods-list>
    </scroll>
    <detail-bottom-bar @addEvent="addToCart"></detail-bottom-bar>
    <back-top @backTopClick="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParams from "@/views/detail/childComps/DetailParams";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
import GoodsList from "@/components/content/goods/GoodsList";

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail";
import Scroll from "@/components/common/scroll/scroll";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";

import {itemLinstenerMixin,backTopMixin} from "@/common/mixin";
import {debounce} from "@/common/utils";

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
    DetailBottomBar,
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
      this.getOffsetTop()
    },
    itemClick(index) {
      this.$refs.scrollComp.scrollTo(0,-this.offsetTopArray[index],400)
    },
    scrollListener(position) {
      for(let i = 0; i < this.offsetTopArray.length - 1; i++){
        if((this.$refs.nav.currentIndex != i) && (-position.y >= this.offsetTopArray[i] && -position.y < this.offsetTopArray[i + 1])) {
          this.$refs.nav.currentIndex = i
        }
      }
      this.showBackTop(position)
    },
    addToCart() {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      this.$store.dispatch('ChangeCart',product)
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
      itemImgListener: () => {},
      getOffsetTop: () => {},
      offsetTopArray: []
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

      this.getOffsetTop = debounce(() => {
        this.offsetTopArray = []
        this.offsetTopArray.push(0)
        this.offsetTopArray.push(this.$refs.param.$el.offsetTop - 44)
        this.offsetTopArray.push(this.$refs.comment.$el.offsetTop - 44)
        this.offsetTopArray.push(this.$refs.recommend.$el.offsetTop - 44)
        this.offsetTopArray.push(Number.MAX_VALUE)
      },100)
    })
  },
  mixins: [itemLinstenerMixin,backTopMixin],
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
    height: calc(100% - 44px - 2.09rem);
  }
  #detail-params {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
