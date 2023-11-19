import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: false,
        user: {}
    },
    reducers: {
        login: (state, action) => {
            state.status = action.payload.status; 
            state.user = action.payload.user;
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