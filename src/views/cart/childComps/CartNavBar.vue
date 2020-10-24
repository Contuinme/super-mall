<template>
  <nav-bar id="nav-bar">
    <div slot="center">购物车({{cartListLength}})</div>
  </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {mapGetters} from "vuex";

export default {
  name: "CartNavBar",
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['cartListLength'])
  }
}
</script>

<style scoped>
  #nav-bar {
    background-color: lightpink;
    color: #ffffff;
    font-size: 15px;
    line-height: 44px;
  }
</style>
