import {debounce} from "@/common/utils";

export const itemLinstenerMixin = {
  mounted() {
    let refresh = debounce(this.$refs.scrollComp.refresh, 100)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('imgFinishLoad',this.itemImgListener)
  }
}
