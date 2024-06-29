import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper"
import authService from "./authServices";

export interface IAuth {
    superAdminInfo: {
        id: number,
        email: string,
        type: string,
        createdAt: string,
        updatedAt: string,

    } | null,
    isLoggedIn: boolean,
    token: string | null,
    redirect?: string | null,
    isLoading: boolean
}

export type AuthState = IAuth

const initialState = {
    superAdminInfo: null, isLoggedIn: false, token: null
} as AuthState


export const getSuperAdmin = createAsyncThunk(
    "merchant/getSuperAdmin",
    async (payload: string, thunkAPI) => {
      try {
        return await authService.fetchSuperAdmin(payload);
      } catch (error) {
        return thunkAPI.rejectWithValue("something went wrong");
      }
    }
  );

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action){
            state.superAdminInfo = action.payload.data.value,
            state.isLoggedIn = true,
            state.token = action.payload.token
        },
        addAuthenticatedSuperAdminInfo(state, action){
            state.superAdminInfo = action.payload.data.user,
            state.isLoggedIn = true,
            state.token = action.payload.token
        },
        updateSuperAdminInfo(state, action){
            const { payload } = action
            state.superAdminInfo = payload.updated_merchant
        },
        logOut(state, action){
            state.superAdminInfo = null,
            state.isLoggedIn = false
            state.token = null,
            state.redirect = action.payload
        },
        clearToken(state){
            state.token = null
        },
        addToken(state, action){
            state.token = action.payload
        },
        addUserInfo(state, action){
            state.superAdminInfo = action.payload
        },
        logOutFalse(state){
            state.isLoggedIn = false
        },
        clearUserInfo(state){
            state.superAdminInfo = null
        },
        addRedirect(state, action) {
            state.redirect = action.payload
        }
            // Special reducer for hydrating the state. Special case for next-redux-wrapper
        },
        extraReducers: (builder)=>{
            builder
                .addCase(HYDRATE, (state, action: AnyAction)=>{
                    return {
                        ...state,
                        ...action.payload.auth,
                        };
                })
                .addCase(getSuperAdmin.pending, (state) => {
                    state.isLoading = true;
                  })
                .addCase(getSuperAdmin.fulfilled, (state: AuthState, action) => {
                (action);
                state.isLoading = false;
                // state.SuperAdminInfo = action.payload;
                // state.token = action.payload.token
                })
                .addCase(getSuperAdmin.rejected, (state: AuthState, action) => {
                (action);
                state.isLoading = false;
                });

}})

export const {login, updateSuperAdminInfo, logOut, clearToken, addToken, addUserInfo, logOutFalse, clearUserInfo, addRedirect, addAuthenticatedSuperAdminInfo} = authSlice.actions
export default authSlice.reducer

