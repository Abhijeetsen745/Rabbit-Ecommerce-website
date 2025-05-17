import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import productReducer from './productSlice.js'
import cartReducer from './cartSlice.js'
import checkoutReducer from './checkoutSlice.js'
import orderReducer from './orderSlice.js'
import adminReducer from './adminSlice.js'
import adminProductsReducer from './adminProductSlice.js'
import adminOrdersReducer from './adminOrderSlice.js'
import subscriberReducer from './subscriberSlice.js'

const store = configureStore({
    reducer: {
        auth:authReducer,
        products: productReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        orders:orderReducer,
        admin:adminReducer,
        adminProducts:adminProductsReducer,
        adminOrders:adminOrdersReducer,
        subscriber:subscriberReducer,
    }
})

export default store;