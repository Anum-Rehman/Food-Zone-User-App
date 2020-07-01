import { ADD_ORDER, ORDERS } from '../actions/types';
const initialState = {
    order: {
        items: [],
        orders: [],
        customer: {}
    }
}
export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_ORDER:
            return {
                ...state,
                order: { customer: action.payload.customer, items: action.payload.cartItems }
            }
        case ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        default:
            return state
    }
}
