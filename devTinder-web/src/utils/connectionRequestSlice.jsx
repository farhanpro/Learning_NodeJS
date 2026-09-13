import {createSlice} from '@reduxjs/toolkit';

const connectionRequestSlice = createSlice({
    name :'connectionRequest',
    initialState: null,
    reducers:{
        addConnectionRequest: (state, action) =>  action.payload,
        
        removeConnectionRequest: (state, action) => {
            const newArray  = state.filter(request => request._id !== action.payload);
            return newArray;
            
        }
    },
});

export const { addConnectionRequest, removeConnectionRequest } = connectionRequestSlice.actions;
export default connectionRequestSlice.reducer;