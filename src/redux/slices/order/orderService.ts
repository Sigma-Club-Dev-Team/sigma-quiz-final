import { api } from "@/api";
import { PaginationPayload } from "@/types";

const fetchOrders = async(payload: PaginationPayload | null) => {
    const response = await api.getOrders(payload)
    return response.data
}

const orderService = {
    fetchOrders
}

export default orderService