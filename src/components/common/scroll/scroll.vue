<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
  name: "scroll",
  data() {
    return {
      scroll: {}
    }
  },
  mounted() {
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3
      })

      this.scroll.on("scroll",(position) => {
        console.log(position);
      },1000)
    })
  }
}
</script>

<style scoped>

</style>
