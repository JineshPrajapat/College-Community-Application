import { configureStore } from '@reduxjs/toolkit'
import chatSlice from './chatSlice'
import messagesReducer from './messagesSlice'

export const store = configureStore({
  reducer: {
        chat : chatSlice,
        messages: messagesReducer,
  },
})