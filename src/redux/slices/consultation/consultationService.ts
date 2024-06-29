import { api } from "@/api";
import { PaginationPayload } from "@/types";

const fetchConsultations = async(payload: PaginationPayload | null) => {
    const response = await api.getConsultations(payload)
    return response.data
}

const consultationService = {
    fetchConsultations
}

export default consultationService