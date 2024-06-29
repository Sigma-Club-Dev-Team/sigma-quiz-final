import { api } from "@/api"
import { PaginationPayload } from "@/types"

const fetchDoctors = async() => {
    const response = await api.getDoctors()
    return response.data
}

const doctorService = {
    fetchDoctors
}

export default doctorService;