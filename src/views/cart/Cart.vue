<template>
  <div id="cart">
    <cart-nav-bar></cart-nav-bar>
    <cart-list></cart-list>
  </div>
</template>

<script>
import CartNavBar from "@/views/cart/childComps/CartNavBar";
import CartList from "@/views/cart/childComps/CartList";
export default {
  name: "Cart",
  components: {
    CartNavBar,
    CartList
  }
}
</script>

<style scoped>
  #cart {
    height: 100vh;
  }
</style>
