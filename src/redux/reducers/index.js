import { combineReducers } from  'redux';
import { reducer as formReducer } from 'redux-form';
import productReducer from './productReducer';
import chefReducer from './chefReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import authReducer from './auth.reducer';
export default combineReducers({
    products: productReducer,
    chefs: chefReducer,
    cart: cartReducer,
    order: orderReducer,
    authReducer,
    form: formReducer
})