import { FETCH_PRODUCTS } from './types';
export const fetchProducts = (list) => dispatch => {
    const foods = list;
    dispatch({
        type: FETCH_PRODUCTS,
        payload: foods
    })
}