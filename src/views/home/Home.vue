<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">不拿钱就拿命购物站</div></nav-bar>
    <tab-control id="tabControl1" ref="tabControl1" :titles="['流行','新款','精选']" @tabClick="tabClick" v-show="tabControlFixed"></tab-control>
    <scroll ref="scrollComp"
            class="content"
            @scroll="scroll"
            @pullingUp="loadMore"
            :click="true"
            :probe-type="3"
            :pull-up-load="true">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommend="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @backTopClick="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import Scroll from '@/components/common/scroll/scroll';
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";

import FeatureView from "@/views/home/ChildComps/FeatureView";
import HomeSwiper from "@/views/home/ChildComps/HomeSwiper";
import HomeRecommendView from "@/views/home/ChildComps/HomeRecommendView";

import {getHomeMultidata,getHomeGoods} from "@/network/home";

import {itemLinstenerMixin,backTopMixin} from '@/common/mixin';

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    FeatureView,
    HomeSwiper,
    HomeRecommendView,
    GoodsList
  },
  data(){
    return {
      banners: [],
      recommends: [],
      goodsList: {
        'pop': {
          page: 0,
          list: []
        },
        'new': {
          page: 0,
          list: []
        },
        'sell': {
          page: 0,
          list: []
        }
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      tabControlFixed: false,
      saveY: 0,
      itemImgListener: () => {}
    }
  },
  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mixins: [itemLinstenerMixin,backTopMixin],
  mounted() {
  },
  methods: {
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      getHomeGoods(type,this.goodsList[type].page + 1).then(res => {
        this.goodsList[type].list.push(...res.data.list)
        this.goodsList[type].page += 1
      })
    },
    tabClick(index) {
      switch (index) {
        case 0:this.currentType = 'pop'
          break
        case 1:this.currentType = 'new'
          break
        case 2:this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    scroll(position) {
      this.showBackTop(position)
      this.tabControlFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scrollComp.finishPullUp()
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
  },
  computed: {
    showGoods() {
      return this.goodsList[this.currentType].list
    }
  },
  activated() {
    this.$refs.scrollComp.scrollTo(0,this.saveY,0)
    this.$refs.scrollComp.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scrollComp.getScrollY()
    this.$bus.$off('imgFinishLoad',this.itemImgListener)
  }
}
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: relative;
    /*left: 0;*/
    /*top: 0;*/
    /*right: 0;*/
    z-index: 9;
  }

  #tabControl1 {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
