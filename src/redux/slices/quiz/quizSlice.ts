import { PaginationPayload } from "@/types";
import { createSlice, AnyAction, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import quizService from "./quizService";

export interface IQuizDetail {
    id:                  string;
    year:                number;
    title:               string;
    description:         null;
    date:                Date;
    rounds:              Round[];
    schoolRegistrations: SchoolRegistrationElement[];
}

export interface Round {
    id:                       string;
    quizId:                   string;
    name:                     string;
    round_number:             number;
    no_of_questions:          number;
    no_of_schools:            number;
    marks_per_question:       number;
    marks_per_bonus_question: number;
    schoolParticipations:     SchoolRoundParticipation[];
    questions:                Question[];
}

export interface Question {
    id:                 string;
    roundId:            string;
    question_number:    number;
    answered_by:        AnsweredBy | null;
    answered_correctly: boolean | null;
    bonus_to:           AnsweredBy | null;
}

export interface AnsweredBySchoolRegistration {
    id:       string;
    quizId:   string;
    schoolId: string;
    quiz:     IQuiz;
    school:   School;
    rounds:   AnsweredBy[];
    score:    number;
    position: number;
}

export interface AnsweredBy {
    id:                   string;
    roundId:              string;
    schoolRegistrationId: string;
    schoolRegistration?:  AnsweredBySchoolRegistration;
    score:                number;
    position:             number;
}
export interface School {
    id:      string;
    name:    string;
    state:   string;
    address: string;
}

export interface SchoolRoundParticipation {
    id:                   string;
    roundId:              string;
    schoolRegistrationId: string;
    score:                number;
    position:             number;
    answered_questions:   Question[];
    bonus_questions:      Question[];
}

export interface SchoolRegistrationElement {
    id:       string;
    quizId:   string;
    schoolId: string;
    quiz:     IQuiz;
    school:   School;
    rounds:   SchoolRoundParticipation[];
    score:    number;
    position: number;
}

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
    quizDetails: IQuizDetail | null,
    quizzesLoading: boolean,
    schoolRegistration: SchoolRegistrationElement | null,
    errorFetching: boolean
}

const initialState = {
    quizzes: [],
    quiz: null,
    quizzesLoading: false,
    quizDetails: null,
    schoolRegistration: null,
    errorFetching: false
} as QuizState

export const getQuizzes = createAsyncThunk('quiz/getQuizzes', async(payload: undefined, thunkAPI) => {
    try{
        return await quizService.fetchAllQuizzes()
    }catch(err){
        return thunkAPI.rejectWithValue("Something went wrong")
    }
})

export const getQuizDetails = createAsyncThunk('quiz/getQuizDetails', async(payload: string, thunkAPI) => {
    try{
        return await quizService.fetchQuizDetails(payload)
    }catch(err){
        return thunkAPI.rejectWithValue("Something went wrong")
    }
})

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuiz(state, action){
            const {payload} = action
            state.quiz = payload
        },
        setQuizDetails(state, action){
            const {payload} = action
            state.quizDetails = payload
        },
        setSchoolRegistration(state, action){
            const {payload} = action
            state.schoolRegistration = payload
        }
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
        .addCase(getQuizDetails.pending, (state)=>{
            state.quizzesLoading = true
        })
        .addCase(getQuizDetails.fulfilled, (state, action)=>{
            state.quizzesLoading = false;
            state.quizDetails = action.payload ?? null
        })
        .addCase(getQuizDetails.rejected, (state)=>{
            state.quizzesLoading = false;
            
            state.errorFetching = true
        })
    }
})

export const { setQuiz, setSchoolRegistration, setQuizDetails } = quizSlice.actions
const quizReducer = quizSlice.reducer
export default quizReducer