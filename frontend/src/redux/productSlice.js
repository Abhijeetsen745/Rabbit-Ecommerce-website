import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//async thunk to fetch products by collections and filters
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit,
  }) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (gender) query.append("gender", gender);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );
    return response.data;
  }
);

//async thunk to fetch single product by id
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );
    
    return response.data;
  }
);

//async thunk to update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);

//async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      collection: "",
      size: "",
      color: "",
      gender: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      category: "",
      material: "",
      brand: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        collection: "",
        size: "",
        color: "",
        gender: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        category: "",
        material: "",
        brand: "",
      };
    },
  },
  extraReducers:(builder)=>{
    builder
    //handle fetching products with filter
    .addCase(fetchProductsByFilters.pending,(state,action)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchProductsByFilters.fulfilled,(state,action)=>{
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
    })
    .addCase(fetchProductsByFilters.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.error.message;
    })
    //handle fetching single product
    .addCase(fetchProductDetails.pending,(state,action)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchProductDetails.fulfilled,(state,action)=>{
        state.loading = false;
        state.selectedProduct = action.payload || null;
    })
    .addCase(fetchProductDetails.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.error.message;
    })
    //handle updating product
    .addCase(updateProduct.pending,(state,action)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(updateProduct.fulfilled,(state,action)=>{
        state.loading = false;
        const index = state.products.findIndex(product => product._id === action.payload._id);
        if(index !== -1){
            state.products[index] = action.payload;
        }
    })
    .addCase(updateProduct.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.error.message;
    })
    //handle fetching similar products
    .addCase(fetchSimilarProducts.pending,(state,action)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchSimilarProducts.fulfilled,(state,action)=>{
        state.loading = false;
        state.similarProducts = Array.isArray(action.payload) ? action.payload : [];
    })
    .addCase(fetchSimilarProducts.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.error.message;
    })

    
  }
});


export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;