import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: false,
        user: {}
    },
    reducers: {
        login: (state, action) => {
            console.log("Login işlemi biti.")
            const userProfile = {
                id: action.payload.user.profile.sub,
                name: action.payload.user.profile.name,
                role: action.payload.user.profile.role,
                email: action.payload.user.profile.preferred_username
            }  
            state.status = action.payload.status; 
            state.user = userProfile;
        },
        register: (state, action) => {
            let { name, email, pass } = action.payload;
            state.status = true
            state.user = {
                name: name,
                role: 'customer',
                email: email,
                pass: pass
            }
        },
        logout: (state) => {
            state.status = false
            state.user = { }
        }
    }
})

const userReducer = userSlice.reducer
export default userReducer