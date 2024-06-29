import { PaginationPayload } from "@/types";
import { createSlice, AnyAction, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IPharmacy, IProductVariation } from "../medicine/medicineSlice";
import { updateObjectInArray } from "@/lib/utilityFunctions";
import { IDoctor } from "../doctor/doctorSlice";
import { ITest } from "../tests/testSlice";
import quizService from "./quizService";

export interface IQuiz {
    id: string,
    year: number,
    title: string,
    description: string | null,
    date: string
}

type QuizState = {
    quizzes: IQuiz[],
    quiz: IQuiz | null,
    quizzesLoading: boolean,
}

const initialState = {
    quizzes: [],
    quiz: null,
    quizzesLoading: false
} as QuizState

export const getQuizzes = createAsyncThunk('quiz/getQuizzes', async(payload: undefined, thunkAPI) => {
    try{
        return await quizService.fetchAllQuizzes()
    }catch(err){
        return thunkAPI.rejectWithValue("Something went wrong")
    }
})

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        // updateConsultations(state, action){
        //     const {payload} = action
        //     console.log({payload})
        //     const newArray = updateObjectInArray(state.consultations, payload.consultation)
        //     state.consultations = newArray
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action: AnyAction)=>{
            return{
                ...state,
                ...action.payload.auth,
            }
        })
        .addCase(getQuizzes.pending, (state)=>{
            state.quizzesLoading = true
        })
        .addCase(getQuizzes.fulfilled, (state, action)=>{
            state.quizzesLoading = false;
            state.quizzes = action.payload ?? []
        })
        .addCase(getQuizzes.rejected, (state)=>{
            state.quizzesLoading = false;
        })
    }
})

export const {  } = quizSlice.actions
const quizReducer = quizSlice.reducer
export default quizReducer