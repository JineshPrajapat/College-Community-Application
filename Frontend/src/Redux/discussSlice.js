import { createSlice } from '@reduxjs/toolkit'

export const discussSlice = createSlice({
  name: 'discuss',
  initialState :{
    discussion: [],
    onlineUser:[],
    currentChat : {
      currentUserID : "",
      fullName: "",
      profileImage: "",
      email:"",
      online:false
    }
  },
  reducers: {
    setDiscussion : (state, action) =>{
      state.discussion = action.payload;
    },
    discussionRecieved :(state, action)=>{
      state.discussion.push(action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDiscussion, discussionRecieved } = discussSlice.actions;

export default discussSlice.reducer