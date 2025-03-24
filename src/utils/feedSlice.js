import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=> action.payload,
        
        removeUserFromFeed:(state,action)=> {
            const newFeed=state.filter((user)=>user._id !== action.payload)//here action.payload is what we are sending form the ui to intrested or rejected, and user is comming from out state
            return newFeed; //returning the new feed array of intrested or rejected one
        },
        
    },
});

export const {addFeed,removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;