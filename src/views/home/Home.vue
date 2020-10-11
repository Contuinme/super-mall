<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">不拿钱就拿命购物站</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommend="recommends"></home-recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";

import FeatureView from "@/views/home/ChildComps/FeatureView";
import HomeSwiper from "@/views/home/ChildComps/HomeSwiper";
import HomeRecommendView from "@/views/home/ChildComps/HomeRecommendView";

import {getHomeMultidata,getHomeGoods} from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
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
      currentType: 'pop'
    }
  },
  created() {
    this.getHomeMultidata();

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
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
</style>
