import { QuizStatus } from "@/redux/slices/quiz/quizSlice"

export type ToggleStatusPayload = {
    status: QuizStatus,
    quizId: string
}