<template>
  <div class="wrapper" ref="wrapper">
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
      scroll: null
    }
  },
  methods: {
    scrollTo(x,y,time=300) {
      this.scroll.scrollTo(x,y,time)
    },
    refresh() {
      this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    getScrollY() {
      return this.scroll.y
    }
  },
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click:this.click,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    this.scroll.on("scroll",(position) => {
      this.$emit('scroll',position)
    })

    this.scroll.on('pullingUp',() => {
      this.$emit('pullingUp')
    })
  }
}
</script>

<style scoped>

</style>
