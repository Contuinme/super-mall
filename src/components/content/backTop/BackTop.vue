<template>
  <div id="backTop" @click="backTopClick">
    <img src="~assets/img/common/top.png" alt="回到顶部图片">
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
    backTopClick() {
      this.$emit('backTopClick')
    }
  }
}
</script>

<style scoped>
  #backTop {
    position: fixed;
    right: 15px;
    bottom: 50px;
  }
  #backTop img {
    width: 40px;
    height: 40px;
  }
</style>
