import { FETCH_CHEFS } from '../actions/types';
const initialState = {
    items: []
};
export default function(state = initialState, action) {
    switch(action.type){
        case FETCH_CHEFS:
            return {
                ...state,
                items:action.payload
            }
        default:
            return state
    }
}