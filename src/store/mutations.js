import {ADD_CARTCOUNT,ADD_CARTLIST} from "@/store/mutations_type";

export default {
  [ADD_CARTCOUNT](state, payload) {
    payload.count += 1
  },
  [ADD_CARTLIST](state, payload) {
    payload.count = 1
    state.cartList.push(payload)
  }
}
