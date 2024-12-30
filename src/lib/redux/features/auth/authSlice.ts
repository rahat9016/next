import { createSlice } from "@reduxjs/toolkit";



// ~ I -> Interface
interface IInitialState {
    userInformation:{
        id: string;
        name: string;
        email: string;
        role: string;
        routes: string[];
        permissions: string[];
    },
    data: any
}

const initialState: IInitialState = {
    userInformation:{
        id: "",
        name: "",
        email: "",
        role: "",
        routes: [],
        permissions: [],
    },
    data: []
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setUserInformation: (state, action) => {
            state.userInformation = { ...initialState.userInformation, ...action.payload }
        },
        setData: (state, action) => {
            state.data = {...initialState.data, ...action.payload}
        }
    }
})

export const { setUserInformation, setData } = authSlice.actions

export default authSlice.reducer