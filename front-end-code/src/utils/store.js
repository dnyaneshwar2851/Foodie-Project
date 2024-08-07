import { configureStore} from '@reduxjs/toolkit';
import resReducer from './restaurantSlice';

const store = configureStore({
    reducer: {
        resReducer
    }
})

export default store;
