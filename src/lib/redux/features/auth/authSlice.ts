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
    }
}

const initialState: IInitialState = {
    userInformation:{
        id: "",
        name: "",
        email: "",
        role: "",
        routes: [],
        permissions: [],
    }
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setUserInformation: (state, action) => {
            state.userInformation = { ...initialState.userInformation, ...action.payload }
        }
    }
})

export const { setUserInformation } = authSlice.actions

export default authSlice.reducer