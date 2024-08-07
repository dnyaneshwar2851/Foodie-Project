import { createSlice } from "@reduxjs/toolkit";

const resSlice = createSlice({
    name:'restaurant',
    initialState: {
        restaurantInfo:{},
        isRecordUpdated: false,
        isDialogOpen:false
    },
    reducers:{
        setRestauranInfo: (state, action) => {
            state.restaurantInfo = action.payload;
        },
        setRecordUpdated: (state, action) => {
            state.isRecordUpdated = action.payload;
        },
        setDialogOpen: (state, action) => {
            state.isDialogOpen = action.payload;
        }
    }
})

export const { setDialogOpen, setRecordUpdated, setRestauranInfo } = resSlice.actions;

export default resSlice.reducer;