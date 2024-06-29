import { createSlice, AnyAction, createAsyncThunk } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import { Dayjs } from "dayjs";
import { PaginationPayload } from "@/types";
import prescriptionService from "./prescriptionService";
import { IProductVariation } from "../medicine/medicineSlice";
import { updateObjectInArray } from "@/lib/utilityFunctions";
import { IOrder } from "../order/orderSlice";

export interface IPrescriptionItem {
    id: number,
    PrescriptionId: number,
    OrderId: undefined,
    quantity: number,
    ProductVariationId: number,
    createdAt: string,
    updatedAt: string,
    ProductId: number | null,
    ProductVariation: IProductVariation
}

export interface IUser {
    first_name: string,
    last_name: string,
    phone: string,
    string: string
}

export interface IPrescription {
    id: number,
    images: string[] | null,
    UserId: number,
    type: string | null,
    status: string,
    has_been_resolved_to_order: boolean | null,
    ProductVariantId: number | null,
    OrderId: number | null,
    PharmacyId: number,
    customer_location: string,
    reupload_photo: boolean | null,
    comment: string | null,
    shown: boolean | null,
    channel: string | null,
    createdAt: string,
    updatedAt: string,
    PrescriptionItems: IPrescriptionItem[],
    User: IUser,
    Pharmacy: {
        name: string
    } | null,
    Order?: IOrder,
}

type PrescriptionState = {
    prescriptions: IPrescription[];
    prescriptionsLoading: boolean;
    pageInfo: {
        count: number;
        limit: number;
        page: number;
    };
}

const initialState = {
    prescriptions: [],
    prescriptionsLoading: false,
    pageInfo: {
        count: 0,
        limit: 0,
        page: 1
    }
} as PrescriptionState

export const getPrescriptions = createAsyncThunk(
    "prescription/getPrescriptions",
    async(payload: PaginationPayload | null, thunkAPI) => {
        try{
            console.log('getting prescriptions')
            return await prescriptionService.fetchPrescriptions(payload)
        }catch(err){
            return thunkAPI.rejectWithValue("Something went wrong")
        }
    }
)

const prescriptionSlice = createSlice({
    name: 'prescription',
    initialState,
    reducers: {
        updatePrescriptions(state, action){
            const {payload} = action
            const newArray = updateObjectInArray(state.prescriptions, payload.prescription)
            state.prescriptions = newArray
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(HYDRATE, (state, action: AnyAction)=>{
            return {
                ...state,
                ...action.payload.auth,
            }
        })
        .addCase(getPrescriptions.pending, (state)=>{
            state.prescriptionsLoading = true
        })
        .addCase(getPrescriptions.fulfilled, (state, action)=>{
            state.prescriptionsLoading = false;
            state.prescriptions = action.payload.data.prescriptions
            state.pageInfo.count = action.payload.data.pagination_info?.count ?? 8
            state.pageInfo.page = action.payload.data.pagination_info?.page ?? 1
        })
        .addCase(getPrescriptions.rejected, (state)=>{
            state.prescriptionsLoading = false;
        })
    }
})

export const { updatePrescriptions } = prescriptionSlice.actions
export default prescriptionSlice.reducer