import { api } from "@/api";
import { PaginationPayload } from "@/types";

const fetchAllQuizzes = async() => {
    const response = await api.getAllQuizzes()
    return response.data
}

const quizService = {
    fetchAllQuizzes
}

export default quizService