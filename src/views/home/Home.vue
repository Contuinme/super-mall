<template>
  <div>
    <nav-bar class="home-nav"><div slot="center">不拿钱就拿命购物站</div></nav-bar>
    <h1>首页</h1>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: "Home",
  components: {
    NavBar
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
