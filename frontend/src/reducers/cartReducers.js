import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAN_ITEMS,

} from '../constants/cartConstants'

export const cartReducer = (state = {cartItems: [], saveShippingAddressReducer: {} }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x._id === item._id)

            if (existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => 
                        x._id === existItem._id ? item : x
                    )
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x._id !== action.payload)
            }
        
        // Shipping Address

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
            
        // Payment Method
        
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
            
        // Cleat cart items from local storage 

        case CART_CLEAN_ITEMS:
        return {
            ...state,
            cartItems: []
        }
        
        default:
            return state
    }

}