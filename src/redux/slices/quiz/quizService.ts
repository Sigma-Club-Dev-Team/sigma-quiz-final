import { api } from "@/api";
import { PaginationPayload } from "@/types";

const fetchAllQuizzes = async() => {
    const response = await api.getAllQuizzes()
    return response.data
}

const fetchQuizDetails = async(payload: string) => {
    const response = await api.getQuizDetails(payload)
    return response.data
}

const quizService = {
    fetchAllQuizzes, fetchQuizDetails
}

export default quizService