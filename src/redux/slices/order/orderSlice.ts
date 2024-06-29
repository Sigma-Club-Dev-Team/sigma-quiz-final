import { PaginationPayload } from "@/types";
import { createSlice, AnyAction, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import orderService from "./orderService";
import { IPharmacy, IProductVariation } from "../medicine/medicineSlice";
import { updateObjectInArray } from "@/lib/utilityFunctions";

export interface IOrderItem {
    id: number,
    OrderId: number,
    quantity: number,
    ProductVariationId: number,
    ProductVariation: IProductVariation,
    price: number | null,
    createdAt: string,
    updatedAt: string,
    product_variation_title: string | null,
    product_name: string | null,
    prescriptions_confirmed: boolean | null,
    prescription_required: boolean | null,
}

export interface IOrder {
    id: number
    UserId: number,
    phone: string,
    name: string,
    address: string,
    coordinates: {
        crs: {
            type: string,
            properties: {
                name: string
            }
        },
        type: string,
        coordinates: number[]
    },
    type: string,
    delivery_time: string,
    delivery_duration_from: string,
    delivery_duration_to: string,
    rider_name: string | null,
    rider_phone_number: string | null,
    PharmacyId: number,
    product_variation_title: string,
    delivery_fee: number | null,
    sub_total_fee: number | null,
    status: string,
    fees: {
        total: number,
        breakdown: {type: string, amount: number}[]
    },
    images: string[],
    createdAt: string,
    updatedAt: string,
    OrderItems: IOrderItem[] | null,
    Pharmacy: IPharmacy | null
}

type OrderState = {
    orders: IOrder[],
    order: IOrder | null,
    ordersLoading: boolean,
    pageInfo: {
        count: number;
        limit: number;
        page: number;
    };
}

const initialState = {
    orders: [],
    order: null,
    ordersLoading: false,
    pageInfo: {
        count: 0,
        limit: 0,
        page: 1
    }
} as OrderState

export const getOrders = createAsyncThunk('order/getOrders', async(payload: PaginationPayload | null, thunkAPI) => {
    try{
        return await orderService.fetchOrders(payload)
    }catch(err){
        return thunkAPI.rejectWithValue("Something went wrong")
    }
})

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        updateOrders(state, action){
            const {payload} = action
            const newArray = updateObjectInArray(state.orders, payload.order)
            state.orders = newArray
        }
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action: AnyAction)=>{
            return{
                ...state,
                ...action.payload.auth,
            }
        })
        .addCase(getOrders.pending, (state)=>{
            state.ordersLoading = true
        })
        .addCase(getOrders.fulfilled, (state, action)=>{
            state.ordersLoading = false;
            state.orders = action.payload.data.orders ?? []
            state.pageInfo.count = action.payload.data.pagination_info?.count ?? 8
            state.pageInfo.page = action.payload.data.pagination_info?.page ?? 1
        })
        .addCase(getOrders.rejected, (state)=>{
            state.ordersLoading = false;
        })
    }
})

export const { updateOrders } = orderSlice.actions
const orderReducer = orderSlice.reducer
export default orderReducer