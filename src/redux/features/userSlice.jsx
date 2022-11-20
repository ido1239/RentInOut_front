import { createSlice } from "@reduxjs/toolkit";
const key = "userData"
const initialState = localStorage[key] ?{
    isLoggedIn: true,
    role: JSON.parse( localStorage[key]).role,
    active: JSON.parse( localStorage[key]).active,
}
:{
    isLoggedIn: false,
    role: "",
    active: false
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers :{
        isLoggedIn: (state) =>{
            state.active = localStorage[key] ? JSON.parse( localStorage[key]).active : state.active
            if(state.active){
                state.isLoggedIn = !state.isLoggedIn
                state.role = JSON.parse( localStorage[key]).role
            }
            else{
                state.isLoggedIn = !state.isLoggedIn
            }
        }
        
    }
})

export const {isLoggedIn} = userSlice.actions
export default userSlice.reducer