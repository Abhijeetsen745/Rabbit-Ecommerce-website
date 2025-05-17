import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

//async thunk to fetch all products for admin
export const fetchAllProducts = createAsyncThunk(
  "adminProducts/fetchAllProducts",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
      {
        headers:{
            Authorization: USER_TOKEN
        }
      }
    );
    return response.data;
  }
);

//async thunk to create a new product
export const createProduct = createAsyncThunk('adminProducts/createProduct', async (productData) => {
    const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
        productData,
        {
            headers:{
                Authorization: USER_TOKEN
            }
        }
    );
    return response.data;
})

//async thunk to update a product
export const updateProduct = createAsyncThunk('adminProducts/updateProduct', async ({id,productData}) => {
    const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,
        productData,
        {
            headers:{
                Authorization: USER_TOKEN
            }
        }
    );
    return response.data;
})

//async thunk to fetch a single product
export const fetchSingleProduct = createAsyncThunk('adminProducts/fetchSingleProduct', async (id) => {
    const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,
        {
            headers:{
                Authorization: USER_TOKEN
            }
        }
        );
        
        
    return response.data;
}
)


//async thunk to delete a product
export const deleteProduct = createAsyncThunk('adminProducts/deleteProduct', async (id) => {
    const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,
        {
            headers:{
                Authorization: USER_TOKEN
            }
        }
    );
    return id;
})

const adminProductSlice = createSlice({
    name:'adminProducts',
    initialState:{
        products:[],
        selectedProduct:null,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        //create product
        .addCase(createProduct.fulfilled,(state,action)=>{
            state.products.push(action.payload);
        })
        //update product
        .addCase(updateProduct.fulfilled,(state,action)=>{
            const index = state.products.findIndex(product => product._id === action.payload._id);
            if(index !== -1){
                state.products[index] = action.payload;
            }
        })
        //fetch single product
        .addCase(fetchSingleProduct.fulfilled,(state,action)=>{
            
          state.loading = false; 
          state.selectedProduct = action.payload;
        })

        //delete product
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.products = state.products.filter(product => product._id !== action.payload);
        })

    }
})

export default adminProductSlice.reducer;