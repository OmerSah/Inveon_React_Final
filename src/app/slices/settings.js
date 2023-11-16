import {createSlice} from "@reduxjs/toolkit";

const settingsSlice = createSlice({
    name :'settings',
    initialState : {
        cookie : false,
        stopCookie : false,
        promoCenter : false,
        promoStatus : false,
        stopPromo : false,
    },
    reducers
    : {
        stopPromo:(state)=> {
            state.stopPromo = true
        },
        promoStatus :(state)=> {
            state.promoStatus = true
        },
        promoCenter :(state) => {
            state.promoCenter = !state.promoCenter
        },
        stopCookie : (state) => {
            state.stopCookie = true
        },
        cookie: (state) => {
            state.cookie = !state.cookie
        }
    }
})

const settingsReducer = settingsSlice.reducer
export default settingsReducer