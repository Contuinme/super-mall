import {debounce} from "@/common/utils";

import BackTop from "@/components/content/backTop/BackTop";

export const itemLinstenerMixin = {
  mounted() {
    let refresh = debounce(this.$refs.scrollComp.refresh, 100)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('imgFinishLoad',this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTopClick() {
      this.$refs.scrollComp.scrollTo(0,0,500)
    },
    showBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}
