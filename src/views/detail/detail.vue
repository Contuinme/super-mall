<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
export default {
  name: "detail",
  components: {DetailNavBar},
  comments: {
    DetailNavBar
  },
  data() {
    return {
      iid: -1
    }
  },
  created() {
    this.iid = this.$route.params.iid
  }
}
</script>

<style scoped>

</style>
