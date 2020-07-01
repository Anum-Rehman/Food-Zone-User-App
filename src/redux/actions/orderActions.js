import { ADD_ORDER, ORDERS } from './types';
import { getProducts } from '../../cart/Data';
export const addOrder = (data) => dispatch => {
    dispatch({
        type: ADD_ORDER,
        payload: data
    })
}
export const fetchOrders = (list) => dispatch => {
    const orders = list;
    dispatch({
        type: ORDERS,
        payload: orders
    })
}