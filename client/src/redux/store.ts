import {configureStore} from '@reduxjs/toolkit';
import authSlice from './feature/authSlice';
import productSlice from './feature/productSlice';
import shopSlice from './feature/shopSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice,
        shop: shopSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;