import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

//fetch all orders for admin
export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async (_,{rejectWithValue}) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
            {
              headers: {
                Authorization: USER_TOKEN,
              },
            }
          );
          return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
        
    }
  }
);

//update order delivery status
export const updateOrderStatus = createAsyncThunk(
    "adminOrders/updateOrderStatus",
    async ({id,status},{rejectWithValue}) => {
      try {
          const response = await axios.put(
              `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
              {status},
              {
                headers: {
                  Authorization: USER_TOKEN,
                },
              }
            );
            return response.data;
      } catch (error) {
          console.log(error);
          return rejectWithValue(error.response.data);
          
      }
    }
  );

//delete order
export const deleteOrder = createAsyncThunk(
    "adminOrders/deleteOrder",
    async (id,{rejectWithValue}) => {
      try {
          const response = await axios.delete(
              `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
              {
                headers: {
                  Authorization: USER_TOKEN,
                },
              }
            );
            return id;
      } catch (error) {
          console.log(error);
          return rejectWithValue(error.response.data);
          
      }
    }
  );

  const adminOrderSlice = createSlice({
    name:'adminOrders',
    initialState:{
        orders:[],
        totalOrders:0,
        totalSales:0,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //fetch all orders
        .addCase(fetchAllOrders.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchAllOrders.fulfilled,(state,action)=>{
            state.loading=false;
            state.orders=action.payload;
            state.totalOrders=action.payload.length;
            
            const totalSales = action.payload.reduce((acc,order)=>{
                return acc + order.totalPrice;
            },0);
            state.totalSales=totalSales;
        })
        .addCase(fetchAllOrders.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message || 'failed to fetch orders';
        })
        //update order status
        .addCase(updateOrderStatus.fulfilled,(state,action)=>{
            const index = state.orders.findIndex(order=>order._id===action.payload._id);
            if(index !== -1){
                state.orders[index]=action.payload;
            }
        })
        //delete order fullfilled
        .addCase(deleteOrder.fulfilled,(state,action)=>{
            state.orders=state.orders.filter(order=>order._id!==action.payload);
        })
    }
  })

  export default adminOrderSlice.reducer;