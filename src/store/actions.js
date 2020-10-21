import {ADD_CARTCOUNT,ADD_CARTLIST} from "@/store/mutations_type";

export default {
  ChangeCart(context,payload) {
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    if(oldProduct) {
      context.commit(ADD_CARTCOUNT,oldProduct)
    } else {
      payload.count = 1
      context.commit(ADD_CARTLIST,payload)
    }
  }
}
