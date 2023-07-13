import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
} from '../constants/cartConstants'
import { productDetailsReducer } from './productReducers'


export const cartReducer = (state = {cartItem: [] }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItem.find(x => x.product === item.product)

            if (existItem){
                return {
                    ...state,
                    cartItems: state.cartItem.map(x => 
                        x.product === existItem.product ? item : x
                    )
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItem, item]
                }
            }

        // case CART_REMOVE_ITEM:
        //     return {loading}

        default:
            return state
    }

} 