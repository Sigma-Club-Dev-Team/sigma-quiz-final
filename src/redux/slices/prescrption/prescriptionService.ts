import { api } from "@/api"
import { PaginationPayload } from "@/types"

const fetchPrescriptions = async(payload: PaginationPayload | null) => {
    console.log("Fetching prescriptions")
    const response = await api.getPrescriptions(payload)
    return response.data
}

const prescriptionService = {
    fetchPrescriptions
}

export default prescriptionService;