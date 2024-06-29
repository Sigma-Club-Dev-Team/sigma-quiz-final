import { updateObjectInArray } from "@/lib/utilityFunctions";
import { PaginationPayload } from "@/types";
import { createAsyncThunk, createSlice, AnyAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import doctorService from "./doctorService";

export interface IDoctor {
    id: number,
    name: string,
    email: string,
    phone: string,
    specialty: string,
    SuperAdminId: number,
    profile_image: string,
    createdAt: string,
    updatedAt: string
}

type DoctorState = {
    doctor: IDoctor | null,
    doctors: IDoctor[],
    doctorsLoading: boolean,
    pageInfo: {
        count: number;
        limit: number;
        page: number;
    };
}

const initialState = {
    doctor: null,
    doctors: [],
    doctorsLoading: false,
    pageInfo: {
        count: 0,
        limit: 0,
        page: 1
    }
} as DoctorState


export const getDoctors = createAsyncThunk(
    "doctor/getDoctors",
    async(_: undefined, thunkAPI) => {
        try{
            return await doctorService.fetchDoctors()
        }catch(err){
            return thunkAPI.rejectWithValue("Something went wrong")
        }
    }
)

const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        updateDoctors(state, action){
            const {payload} = action
            const newArray = updateObjectInArray(state.doctors, payload.doctor)
            state.doctors = newArray
        },
        appendDoctor(state, action){
            state.doctors = [action.payload, ...state.doctors]
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(HYDRATE, (state, action: AnyAction)=>{
            return {
                ...state,
                ...action.payload.auth,
            }
        })
        .addCase(getDoctors.pending, (state)=>{
            state.doctorsLoading = true
        })
        .addCase(getDoctors.fulfilled, (state, action)=>{
            state.doctorsLoading = false;
            state.doctors = action.payload.data.doctors
            state.pageInfo.count = action.payload.data.pagination_info?.count ?? 8
            state.pageInfo.page = action.payload.data.pagination_info?.page ?? 1
        })
        .addCase(getDoctors.rejected, (state)=>{
            state.doctorsLoading = false;
        })
    }
})

export const { updateDoctors, appendDoctor } = doctorSlice.actions
const doctorReducer = doctorSlice.reducer
export default doctorReducer