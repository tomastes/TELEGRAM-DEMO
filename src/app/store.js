import { configureStore } from '@reduxjs/toolkit';
import  threadReducer  from '../features/threadSlice';
import userReducer from '../features/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    thread: threadReducer
  },
});
