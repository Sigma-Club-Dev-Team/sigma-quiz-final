import { createSlice, AnyAction, createAsyncThunk } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import medicineService from "./medicineService"
import { Dayjs } from "dayjs";
import { PaginationPayload } from "@/types";

export interface ICategory {
    id: number,
    ParentId: number | null,
    name: string,
    createdAt: string,
    updatedAt: string,
    children: ICategory[]
}

export interface WeeklyOpeningHrs {
    1: IOpeningDays | null;
    2: IOpeningDays | null;
    3: IOpeningDays | null;
    4: IOpeningDays | null;
    5: IOpeningDays | null;
    6: IOpeningDays | null;
    7: IOpeningDays | null;
}

export interface ClientWeeklyOpeningHrs {
    1: ClientOpeningDays | null;
    2: ClientOpeningDays | null;
    3: ClientOpeningDays | null;
    4: ClientOpeningDays | null;
    5: ClientOpeningDays | null;
    6: ClientOpeningDays | null;
    7: ClientOpeningDays | null;
}
  
export type WeeklyOpeningHrsFieldName = keyof WeeklyOpeningHrs

export interface IOpeningDays {
    from: string,
    to: string,
    closed: boolean
}

export interface ClientOpeningDays {
    from: Dayjs,
    to: Dayjs,
    closed: boolean
}

export interface IPharmacy {
    id: number,
    name: string,
    address: string,
    city: string,
    phone_number: string | null,
    location: {
        crs: {
            type: string,
            properties: {
                name: string
            }
        },
        type: string,
        coordinates: number[]
    },
    opening_hours: WeeklyOpeningHrs,
    createdAt: string,
    updatedAt: string
}

export interface IProductImage {
    id: number;
    src: string,
    key: string,
    ProductId?: number
}


export interface IVariant {
    id: string;
    title: string;
    values: { id: string; value: string }[];
}

export interface IProductVariation {
    id: number,
    price: number,
    title: string,
    ProductId: number,
    Product: IProduct,
    stock: number,
    variant: string[],
    PharmacyId: number,
    createdAt: string,
    updatedAt: string,
    Pharmacy: IPharmacy
}

export interface IProduct {
    id: number,
    benefit: string | null,
    benefits: string | null,
    brand: string | null,
    categories: string[] | null,
    description: string | null,
    faqs: string | null,
    how_to_use: string | null,
    ProductImages: IProductImage[] | null,
    ingredients: string | null,
    name: string,
    pharmacies: number[] | null,
    prescription_required: boolean | null,
    product_purpose: string | null,
    product_type: string | null,
    safety_info: string | null,
    side_effects: string | null,
    uses: string | null,
    variants: IVariant[] | null,
    ProductVariations: IProductVariation[] | null,
    rating_count: number | null,
    popularity_count: number | null,
    is_active: boolean | null,
    createdAt: string,
    updatedAt: string,
}

export type Track = string[][];

type MedicineState = {
    categories: ICategory[],
    category: ICategory | null,
    categoriesLoading: boolean,
    pharmacy: IPharmacy | null,
    pharmacies: IPharmacy[],
    pharmaciesLoading: boolean,
    product: IProduct | null,
    products: IProduct[],
    productsTracks: Track[],
    productsLoading: boolean,
    productsPageInfo: {
        count: number;
        limit: number;
        page: number;
    };
    pharmaciesPageInfo: {
        count: number;
        limit: number;
        page: number;
    };
}

const initialState = {
    categories: [],
    category: null,
    categoriesLoading: false,
    pharmacy: null,
    pharmacies: [],
    pharmaciesLoading: false,
    product: null,
    products: [],
    productsLoading: false,
    productsTracks: [],
    productsPageInfo: {
        count: 0,
        limit: 0,
        page: 1
    },
    pharmaciesPageInfo: {
        count: 0,
        limit: 0,
        page: 1
    }
} as MedicineState

export const getCategories = createAsyncThunk(
    "medicine/getCategories",
    async(_: string, thunkAPI) => {
        try{
            return await medicineService.fetchCategories()
        }catch(err){
            return thunkAPI.rejectWithValue("Something went wrong")
        }
    }
)

export const getPharmacies = createAsyncThunk(
    "medicine/getPharmacies",
    async(payload: PaginationPayload | null, thunkAPI) => {
        try{
            return await medicineService.fetchPharmacies(payload)
        }catch(err){
            return thunkAPI.rejectWithValue("Something went wrong")
        }
    }
)

export const getProducts = createAsyncThunk(
    "medicine/getProducts",
    async(payload: PaginationPayload | null, thunkAPI) => {
        try{
            return await medicineService.fetchProducts(payload)
        }catch(err){
            return thunkAPI.rejectWithValue("Something went wrong")
        }
    }
)

export const getProduct = createAsyncThunk(
    "medicine/getProduct",
    async(productId: string, thunkAPI) => {
        try{
            return await medicineService.fetchProduct(productId)
        }catch(err){
            return thunkAPI.rejectWithValue("Something went wrong")
        }
    }
)

const medicineSlice = createSlice({
    name: 'medicine',
    initialState,
    reducers: {
        appendCategory(state, action){
            state.categories = [action.payload, ...state.categories]
        },
        addProduct(state, action){
            state.product = action.payload
        },
        addPharmacy(state, action){
            state.pharmacy = action.payload
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(HYDRATE, (state, action: AnyAction)=>{
            return {
                ...state,
                ...action.payload.auth,
            }
        })
        .addCase(getCategories.pending, (state)=>{
            state.categoriesLoading = true
        })
        .addCase(getCategories.fulfilled, (state, action)=>{
            state.categoriesLoading = false;
            state.categories = action.payload.data.categories.structured_category
        })
        .addCase(getCategories.rejected, (state)=>{
            state.categoriesLoading = false;
        })
        .addCase(getPharmacies.pending, (state)=>{
            state.pharmaciesLoading = true
        })
        .addCase(getPharmacies.fulfilled, (state, action)=>{
            state.pharmaciesLoading = false;
            state.pharmacies = action.payload.data.pharmacies
            state.pharmaciesPageInfo.count = action.payload.data.pagination_info?.count ?? 8
            state.pharmaciesPageInfo.page = action.payload.data.pagination_info?.page ?? 1
        })
        .addCase(getPharmacies.rejected, (state)=>{
            state.pharmaciesLoading = false;
        })
        .addCase(getProducts.pending, (state)=>{
            state.productsLoading = true
        })
        .addCase(getProducts.fulfilled, (state, action)=>{
            state.productsLoading = false;
            state.products = action.payload.data.products;
            // state.productsPageInfo.page = state.productsPageInfo.page + 1
            state.productsPageInfo.count = action.payload.data.pagination_info.count
            state.productsPageInfo.page = action.payload.data.pagination_info.page
            state.productsTracks = action.payload.data.track
        })
        .addCase(getProducts.rejected, (state)=>{
            state.productsLoading = false;
        })
        .addCase(getProduct.pending, (state)=>{
            state.productsLoading = true
        })
        .addCase(getProduct.fulfilled, (state, action)=>{
            state.productsLoading = false;
            state.product = action.payload.data.product
        })
        .addCase(getProduct.rejected, (state)=>{
            state.productsLoading = false;
        })
    }
})

export const { appendCategory, addProduct, addPharmacy } = medicineSlice.actions
export default medicineSlice.reducer