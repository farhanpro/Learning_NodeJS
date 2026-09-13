import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import feedReducer from './feedSlice';
import connectionReducer from './connectionSlice';
import connectionRequestReducer from './connectionRequestSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        connectionRequest: connectionRequestReducer
    },
});


export default appStore;