import {createSlice} from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:'feed',
    initialState:[],
    reducers:{
        setFeed:(state,action)=>{
            return action.payload;
        },
        removeFeed: () => {
            return [];
        }
    }
});

export const {setFeed, removeFeed} = feedSlice.actions;

export default feedSlice.reducer;