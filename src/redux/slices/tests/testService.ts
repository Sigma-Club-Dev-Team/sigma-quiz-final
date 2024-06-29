import { api } from "@/api"
import { PaginationPayload } from "@/types"



const fetchTestCenters = async(payload: PaginationPayload | null) => {
    const response = await api.getTestCenters(payload)
    return response.data
}

const fetchBookingTests = async(payload: PaginationPayload | null) => {
    const response = await api.getBookingTests(payload)
    return response.data
}

const fetchBookingStats = async() => {
    const response = await api.getBookingStats()
    return response.data
}

const fetchTestCategories = async() => {
    const response = await api.getTestCategories()
    return response.data
}

const fetchTests = async(payload: PaginationPayload | null) => {
    const response = await api.getTests(payload)
    return response.data
}

const fetchTest = async(payload: string) => {
    const response = await api.getTest(payload)
    return response.data
}

const testService = {
    fetchTestCenters, fetchBookingTests, fetchBookingStats, fetchTestCategories, fetchTests, fetchTest
}

export default testService;