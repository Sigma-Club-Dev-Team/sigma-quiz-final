import { PaginationPayload } from "@/types";
import { createSlice, AnyAction, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IPharmacy, IProductVariation } from "../medicine/medicineSlice";
import { updateObjectInArray } from "@/lib/utilityFunctions";
import consultationService from "./consultationService";
import { IDoctor } from "../doctor/doctorSlice";
import { ITest } from "../tests/testSlice";

export interface PrescribedDrugs {
    ConsultationId: number,
    ProductVariation: IProductVariation,
    ProductVariationId: number,
    id: number,
    UserId: number,
    quantity: number,
    createdAt: string,
    updatedAt: string
}

export interface RecommendedTest {
    ConsultationId: number,
    id: number,
    UserId: number,
    quantity: number,
    Test: ITest,
    TestId: number,
    createdAt: string,
    updatedAt: string
}
    
export interface IUser {
    first_name: string,
    last_name: string,
    email: string,
    birth_day: string,
    id: number,
    phone: string,
    type: string,
    novu_subscription_id: string,
    createdAt: string,
    updatedAt: string
}
    
export interface IDependant {
    UserId: number,
    User: IUser,
    allergies: null,
    birth_day: string,
    drinks_alchohol: boolean | null,
    email: string,
    family_history: string | null,
    first_name: string,
    last_name: string,
    gender: string,
    has_an_account: boolean,
    has_travelled_in_the_last_two_month: boolean | null,
    health_issues: string | null,
    height_in_feet: string | null,
    height_in_inches: string | null,
    id: number,
    language: string,
    last_doctor_visit: string | null,
    medications: string | null,
    phone: string,
    relationship: string,
    smokes: boolean | null,
    weight_in_kg: string | null
    createdAt: string,
    updatedAt: string
}

export interface IConsultationAttachment {id: string, link: string, name: string, size: number, extension: string}

export interface IConsultation {
    id: number
    DependantId: number,
    Dependant: IDependant | null,
    Doctor: IDoctor | null,
    DoctorId: number,
    PharmacyId: number,
    Pharmacy: IPharmacy | null,
    UserId: number,
    User: IUser,
    PrescribedDrugs: PrescribedDrugs[],
    RecommendedTests: RecommendedTest[],
    allergy_description: string,
    attachments: IConsultationAttachment[] | null,
    consultation_fee: number,
    customer_address: string,
    customer_coordinates: {
        crs: {
            type: string,
            properties: {
                name: string
            }
        },
        type: string,
        coordinates: number[]
    },
    date: string,
    estimated_wait_time: string,
    has_allergies: boolean,
    has_health_info_images: boolean,
    health_info_images: string[],
    is_on_medication: boolean,
    medication_description: string | null,
    meeting_link: string | null,
    reason: string,
    service_fee: number,
    summary: null,
    status: string
    time: string,
    type: string,
    written_drug_prescription: string | null,
    written_test_recomendation: string | null,
    createdAt: string,
    updatedAt: string
}

type ConsultationState = {
    consultations: IConsultation[],
    consultation: IConsultation | null,
    consultationsLoading: boolean,
    pageInfo: {
        count: number;
        limit: number;
        page: number;
    };
}

const initialState = {
    consultations: [],
    consultation: null,
    consultationsLoading: false,
    pageInfo: {
        count: 0,
        limit: 0,
        page: 1
    }
} as ConsultationState

export const getConsultations = createAsyncThunk('consultation/getConsultations', async(payload: PaginationPayload | null, thunkAPI) => {
    try{
        return await consultationService.fetchConsultations(payload)
    }catch(err){
        return thunkAPI.rejectWithValue("Something went wrong")
    }
})

const consultationSlice = createSlice({
    name: 'consultation',
    initialState,
    reducers: {
        updateConsultations(state, action){
            const {payload} = action
            console.log({payload})
            const newArray = updateObjectInArray(state.consultations, payload.consultation)
            state.consultations = newArray
        }
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action: AnyAction)=>{
            return{
                ...state,
                ...action.payload.auth,
            }
        })
        .addCase(getConsultations.pending, (state)=>{
            state.consultationsLoading = true
        })
        .addCase(getConsultations.fulfilled, (state, action)=>{
            state.consultationsLoading = false;
            state.consultations = action.payload.data.consulatations ?? []
            state.pageInfo = action.payload.data.pagination_info
            // state.pageInfo.page = action.payload.data.pagination_info?.page ?? 1
        })
        .addCase(getConsultations.rejected, (state)=>{
            state.consultationsLoading = false;
        })
    }
})

export const { updateConsultations } = consultationSlice.actions
const consultationReducer = consultationSlice.reducer
export default consultationReducer