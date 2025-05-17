import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//creating subscriber
export const getSubscriber = createAsyncThunk(
    "subscriber/getSubscriber",
    async ({email}, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/subscribe`, { email });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                // Treat "Subscriber already exists" as success with a special message
                if (error.response.data.message === "Subscriber already exists") {
                    return { message: "You are already subscribed." };
                }
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({ message: "Network error" });
            }
        }
    }
)

const subscriberSlice = createSlice({
    name : "subscriber",
    initialState: { subscriber: null, error: null, successMessage: null },
    reducers:{
        clearError: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getSubscriber.fulfilled,(state,action)=>{
            state.subscriber = action.payload;
            state.error = null;
            // If message exists and is not an error, treat as success message
            if (action.payload && action.payload.message) {
                state.successMessage = action.payload.message;
            } else {
                state.successMessage = null;
            }
        })
        .addCase(getSubscriber.rejected,(state,action)=>{
            state.error = action.payload ? action.payload.message : "Failed to subscribe";
            state.successMessage = null;
        })
    }
})

export const { clearError } = subscriberSlice.actions;
export default subscriberSlice.reducer;
