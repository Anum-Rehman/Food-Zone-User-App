import { FETCH_CHEFS } from './types';
export const fetchChefs = (list) => dispatch => {
    const chefs = list;
    dispatch({
        type: FETCH_CHEFS,
        payload: chefs
    })
}

