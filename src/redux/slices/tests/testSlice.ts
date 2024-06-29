import { Dayjs } from "dayjs";
import { WeeklyOpeningHrs } from "../medicine/medicineSlice";
import { createAsyncThunk, AnyAction, createSlice } from "@reduxjs/toolkit";
import { PaginationPayload } from "@/types";
import { HYDRATE } from "next-redux-wrapper";
import testService from "./testService";
import { IUser } from "../prescrption/prescriptionSlice";
import { updateObjectInArray } from "@/lib/utilityFunctions";

export interface ITestCategory {
    id: number,
    name: string,
    image: string | null,
    createdAt: string,
    updatedAt: string
}

export interface IMisc {
    gender: string[],
    samples: string[],
    vital_organs: string[],
    categories: {name: string, id: number}[]
}

export interface ITest {
    id: number,
    name: string,
    description: string,
    type: string,
    categories: number[],
    Categories: ITestCategory[] | null,
    sample: string[],
    vital_organs: string[],
    gender: string[] | null,
    min_age: number,
    max_age: number,
    overview: string,
    sample_type: string,
    result_interpretation: string,
    risk_assessment: string,
    faqs: string,
    TestCenterTests: ITestCenterTest[] | null,
    ParentTestId: number | null,
    child_tests: null,
    parent_tests: null,
    popularity_count: number,
    createdAt: string,
    updatedAt: string
}

export interface ITestCenter {
    id: number,
    is_active: boolean,
    phone_number: string,
    area: string,
    name: string,
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
    address: string,
    city: string,
    createdAt: string,
    updatedAt: string
}

export interface IBookingTestCategory {
    id: number,
    ParentId: number | null,
    name: string,
    children: IBookingTestCategory[]
    createdAt: string,
    updatedAt: string,
}

export interface ITestCenterTest {
    id: number,
    TestId: number,
    TestCenterId: number,
    price: number | null,
    TestCenter: ITestCenter,
    Test: ITest,
    createdAt: string,
    updatedAt: string,
}

export interface IBookingAttachment {id: string, link: string, name: string, size: number, extension: string}

export interface IBookingTest {
    id: number,
    UserId: number,
    TestCenterTestId: number,
    possible_dates: string[],
    no_of_patients: number,
    status: string,
    fees: any | null,
    attachments: IBookingAttachment[] | null,
    summary: string | null,
    scheduled_date: string,
    subtotal_fee: number | null,
    service_fee: number | null,
    has_been_checked_out: boolean | null,
    price: number | null,
    city: string,
    User: IUser,
    TestCenterTest: ITestCenterTest,
    createdAt: string,
    updatedAt: string
}

export interface IBookingTestStats {
    total_bookings: number,
    cancelled_bookings: number,
    test_booked: number
}

type TestState = {
    testCenter: ITestCenter | null,
    testCenters: ITestCenter[],
    testCentersLoading: boolean,
    testCentersPageInfo: {
        count: number;
        limit: number;
        page: number;
    };
    test: ITest | null,
    tests: ITest[],
    testsLoading: boolean,
    testsPageInfo: {
        count: number;
        limit: number;
        page: number;
    };
    bookingTest: IBookingTest | null,
    bookingTests: IBookingTest[],
    bookingTestsLoading: boolean,
    bookingStats: IBookingTestStats | null,
    bookingStatsLoading: boolean
    bookingTestsPageInfo: {
        count: number;
        limit: number;
        page: number;
    };
    testCategory: ITestCategory | null;
    testCategories: ITestCategory[];
    testCategoriesLoading: boolean;
    misc: IMisc | null

}

const initialState = {
    testCenter: null,
    testCenters: [],
    testCentersLoading: false,
    testCentersPageInfo: {
        count: 0,
        limit: 0,
        page: 1
    },
    test: null,
    tests: [],
    testsLoading: false,
    testsPageInfo: {
        count: 0,
        limit: 0,
        page: 1
    },
    bookingTest: null,
    bookingTests: [],
    bookingTestsLoading: false,
    bookingStats: null,
    bookingStatsLoading: false,
    bookingTestsPageInfo: {
        count: 0,
        limit: 0,
        page: 1
    },
    testCategories: [],
    testCategoriesLoading: false,
    testCategory: null,
    misc: null
} as TestState


export const getTestCenters = createAsyncThunk(
    "test/getTestCenters",
    async(payload: PaginationPayload | null, thunkAPI) => {
        try{
            return await testService.fetchTestCenters(payload)
        }catch(err){
            return thunkAPI.rejectWithValue("Something went wrong")
        }
    }
)

export const getBookingTests = createAsyncThunk(
    "test/getBookingTests",
    async(payload: PaginationPayload | null, thunkAPI) => {
        try{
            return await testService.fetchBookingTests(payload)
        }catch(err){
            return thunkAPI.rejectWithValue("Something went wrong")
        }
    }
)

export const getBookingTestsStats = createAsyncThunk(
    "test/getBookingTestsStats",
    async(_: undefined, thunkAPI) => {
        try{
            return await testService.fetchBookingStats()
        }catch(err){
            return thunkAPI.rejectWithValue("Something went wrong")
        }
    }
)

export const getTestCategories = createAsyncThunk(
    "test/getTestCategories",
    async(_: string, thunkAPI) => {
        try{
            return await testService.fetchTestCategories()
        }catch(err){
            return thunkAPI.rejectWithValue("Something went wrong")
        }
    }
)

export const getTests = createAsyncThunk(
    "test/getTests",
    async(payload: PaginationPayload | null, thunkAPI) => {
        try{
            return await testService.fetchTests(payload)
        }catch(err){
            return thunkAPI.rejectWithValue("Something went wrong")
        }
    }
)


export const getTest = createAsyncThunk(
    "test/getTest",
    async(testId: string, thunkAPI) => {
        try{
            return await testService.fetchTest(testId)
        }catch(err){
            return thunkAPI.rejectWithValue("Something went wrong")
        }
    }
)

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        appendTestCenter(state, action){
            state.testCenters = [...state.testCenters, action.payload]
        },
        appendTestCategory(state, action){
            state.testCategories = [...state.testCategories, action.payload]
        },
        appendBookingTest(state, action){
            state.bookingTests = [...state.bookingTests, action.payload]
        },
        updateBookings(state, action){
            const {payload} = action
            const newArray = updateObjectInArray(state.bookingTests, payload.booking)
            state.bookingTests = newArray
        },
        updateTestCategories(state, action){
            const {payload} = action
            const newArray = updateObjectInArray(state.testCategories, payload.test_category)
            state.testCategories = newArray
        },
        updateTest(state, action){
            const { test, categories, samples, gender, vital_organs, child_tests } = action.payload
            state.test = test
            state.misc = {categories, samples, gender, vital_organs} as any
            state.test!.Categories! = categories
        }
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action: AnyAction) => {
            return{
                ...state,
                ...action.payload.auth,
            }
        })
        .addCase(getTestCenters.pending, (state)=>{
            state.testCentersLoading = true
        })
        .addCase(getTestCenters.fulfilled, (state, action)=>{
            state.testCentersLoading = false;
            state.testCenters = action.payload.data.test_centers
            state.testCentersPageInfo.count = action.payload.data.pagination_info?.count ?? 8
            state.testCentersPageInfo.page = action.payload.data.pagination_info?.page ?? 1
        })
        .addCase(getTestCenters.rejected, (state)=>{
            state.testCentersLoading = false;
        })
        .addCase(getTests.pending, (state)=>{
            state.testsLoading = true
        })
        .addCase(getTests.fulfilled, (state, action)=>{
            state.testsLoading = false;
            state.tests = action.payload.data.tests.tests
            state.testsPageInfo.count = action.payload.data.tests?.count ?? 8
            state.testsPageInfo.page = action.payload.data.pagination_info?.page ?? 1
        })
        .addCase(getTests.rejected, (state)=>{
            state.testsLoading = false;
        })
        .addCase(getBookingTests.pending, (state)=>{
            state.bookingTestsLoading = true
        })
        .addCase(getBookingTests.fulfilled, (state, action)=>{
            state.bookingTestsLoading = false;
            state.bookingTests = action.payload.data.bookings
            state.bookingTestsPageInfo.count = action.payload.data.pagination_info?.count ?? 8
            state.bookingTestsPageInfo.page = action.payload.data.pagination_info?.page ?? 1
        })
        .addCase(getBookingTests.rejected, (state)=>{
            state.bookingTestsLoading = false;
        })
        .addCase(getBookingTestsStats.pending, (state)=>{
            state.bookingStatsLoading = true
        })
        .addCase(getBookingTestsStats.fulfilled, (state, action)=>{
            state.bookingStatsLoading = false;
            state.bookingStats = action.payload.data.stats
        })
        .addCase(getBookingTestsStats.rejected, (state)=>{
            state.bookingStatsLoading = false;
        })
        .addCase(getTestCategories.pending, (state)=>{
            state.testCategoriesLoading = true
        })
        .addCase(getTestCategories.fulfilled, (state, action)=>{
            state.testCategoriesLoading = false;
            state.testCategories = action.payload.data.test_categories
        })
        .addCase(getTestCategories.rejected, (state)=>{
            state.testCategoriesLoading = false;
        })
        .addCase(getTest.pending, (state)=>{
            state.testsLoading = true
        })
        .addCase(getTest.fulfilled, (state, action)=>{
            const { test, categories, samples, gender, vital_organs } = action.payload.data
            state.testsLoading = false;
            state.test = action.payload.data.test
            state.test!.Categories = categories
            state.misc = {categories, gender, vital_organs, samples} as any
        })
        .addCase(getTest.rejected, (state)=>{
            state.testsLoading = false;
        })
    }
})

export const { appendTestCenter, appendTestCategory, updateTestCategories, appendBookingTest, updateBookings, updateTest } = testSlice.actions
const testReducer = testSlice.reducer
export default testReducer