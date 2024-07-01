import { api } from "@/api";
import { ToggleStatusPayload } from "@/types";

const fetchAllQuizzes = async() => {
    const response = await api.getAllQuizzes()
    return response.data
}

const fetchQuizDetails = async(payload: string) => {
    const response = await api.getQuizDetails(payload)
    return response.data
}

const toggleStatus = async(payload: ToggleStatusPayload) => {
    const response = await api.updateQuizStatus(payload)
    return response.data
}

const quizService = {
    fetchAllQuizzes, fetchQuizDetails, toggleStatus
}

export default quizService