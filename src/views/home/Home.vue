<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">不拿钱就拿命购物站</div></nav-bar>
    <scroll ref="scroll" id="homeView">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommend="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @backTopClick="backTopClick"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import Scroll from '@/components/common/scroll/scroll';
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";

import FeatureView from "@/views/home/ChildComps/FeatureView";
import HomeSwiper from "@/views/home/ChildComps/HomeSwiper";
import HomeRecommendView from "@/views/home/ChildComps/HomeRecommendView";

import {getHomeMultidata,getHomeGoods} from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    FeatureView,
    HomeSwiper,
    HomeRecommendView,
    GoodsList,
    BackTop
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
      currentType: 'pop'
    }
  },
  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    this.$bus.$on("imgFinishLoad", () => {
      console.log(this.$refs.scroll.scroll);
      this.$refs.scroll.refresh()
    })
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
    },
    backTopClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    }
  },
  computed: {
    showGoods() {
      return this.goodsList[this.currentType].list
    }
  }
}
</script>

<style scoped>
  #home {
    padding-top: 44px;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9;
  }

  #homeView {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
</style>
