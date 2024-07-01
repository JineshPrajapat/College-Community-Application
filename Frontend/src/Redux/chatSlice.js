import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  initialState :{
    conversation: [],
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
    setUser : (state,action)=>{
        state._id = action.payload._id
        state.name = action.payload.name 
        state.email = action.payload.email 
        state.profile_pic = action.payload.profile_pic 
    },
    setToken : (state,action)=>{
        state.token = action.payload
    },
    logout : (state,action)=>{
        state._id = ""
        state.name = ""
        state.email = ""
        state.profile_pic = ""
        state.token = ""
        state.socketConnection = null
    },
    setConversation : (state, action) =>{
      state.conversation = action.payload;
    },
    converstionRecieved :(state, action)=>{
      state.conversation.push(action.payload);
    },

    setOnlineUser : (state, action)=>{
      state.onlineUser = action.payload;
    },

    onlineUserRecieved : (state, action) =>{
      state.onlineUser.push(action.payload);
    },

    setCurrentChat : (state, action) =>{
      state.currentChat.currentUserID = action.payload?._id;
      state.currentChat.fullName = action.payload?.name;
      state.currentChat.profileImage = action.payload?.profileImage;
      state.currentChat.email = action.payload?.email
      state.currentChat.online = action.payload?.online
    },
    currentChatDetails : (state, action) =>{
      state.currentChat.push(action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setToken ,logout, setConversation, converstionRecieved, setCurrentChat, currentChatDetails,setOnlineUser, onlineUserRecieved } = chatSlice.actions;

export default chatSlice.reducer