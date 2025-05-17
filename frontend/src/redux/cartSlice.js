import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//helper function to get cart from local storage
export const getCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : {products:[]};
};

//helper function to save cart to local storage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

//async thunk to fetch cart for user or guest
export const fetchCart = createAsyncThunk("cart/fetchCart", async ({userId,guestId},{rejectWithValue}) => {
    try {
        const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/${userId || guestId}`
        );        
        
        return response.data || null;    
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

//add item to cart for user or guest
export const addToCart = createAsyncThunk("cart/addToCart", async ({userId,guestId,productId,quantity,size,color},{rejectWithValue}) => {
    try {
        const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {userId,guestId,productId,quantity,size,color}
        );
        
        
        return response.data;
    } catch (error) {
        console.log(error);        
        return rejectWithValue(error.response.data);
    }
})

//update the quantity of item in cart for user or guest
export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({userId,guestId,productId,quantity,size,color},{rejectWithValue}) => {
    try {
        const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {userId,guestId,productId,quantity,size,color}
        );
        return response.data;
    } catch (error) {
        console.log(error);        
        return rejectWithValue(error.response.data);
    }
})

//remove item from cart for user or guest
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({userId,guestId,productId,size,color},{rejectWithValue}) => {
    try {
        const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {data:{userId,guestId,productId,size,color}}
        );
        return response.data;
    } catch (error) {
        console.log(error);        
        return rejectWithValue(error.response.data);
    }
})

//merge guest cart with user cart
export const mergeCarts = createAsyncThunk("cart/mergeCarts", async ({guestId,user},{rejectWithValue}) => {
    try {
        const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        {guestId,user},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        }
        );
        return response.data;
    } catch (error) {
        console.log(error);        
        return rejectWithValue(error.response.data);
    }
})

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cart:getCartFromLocalStorage(),
        // products:[],
        loading:false,
        error:null,
    },
    reducers:{
        clearCart:(state) => {
            state.cart = {products:[]};
            localStorage.removeItem("cart");
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToLocalStorage(action.payload);
        })
        .addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'failed to fetch cart';
        })
        .addCase(addToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            // The backend returns the whole cart object in action.payload.cart
            // So update the entire cart state instead of pushing a single product
            state.cart = action.payload.cart;
            saveCartToLocalStorage(state.cart);
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'failed to add item in cart';
        })
        .addCase(updateCartItem.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateCartItem.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload.cart;
            saveCartToLocalStorage(state.cart);
        })
        .addCase(updateCartItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'failed to update item in cart';
        })
        .addCase(removeFromCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload.cart;
            saveCartToLocalStorage(state.cart);
        })
        .addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'failed to remove item';
    })
        .addCase(mergeCarts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(mergeCarts.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToLocalStorage(action.payload);
        })
        .addCase(mergeCarts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'failed to merge carts';
        })
    }
})

export const {clearCart} = cartSlice.actions;
export default cartSlice.reducer;