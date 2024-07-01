import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    messageReceived: (state, action) => {
      const date = moment(action.payload.createdAt).format('YYYY-MM-DD');
      if (!state.messages[date]) {
        state.messages[date] = [];
      }
      state.messages[date].push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      const date = moment(action.payload.createdAt).format('YYYY-MM-DD');
      if (!state.messages[date]) {
        state.messages[date] = [];
      }
      state.messages[date].push(action.payload);
    },
  },
});

export const { messageReceived, setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
