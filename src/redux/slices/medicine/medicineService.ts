import { api } from "@/api"
import { PaginationPayload } from "@/types"

const fetchCategories = async() => {
    const response = await api.getCategories()
    return response.data
}

const fetchPharmacies = async(payload: PaginationPayload | null) => {
    const response = await api.getPharmacies(payload)
    return response.data
}

const fetchProducts = async(payload: PaginationPayload | null) => {
    const response = await api.getProducts(payload)
    return response.data
}

const fetchProduct = async(productId: string) => {
    const response = await api.getProduct(productId)
    return response.data
}

const medicineService = {
    fetchCategories, fetchPharmacies, fetchProducts, fetchProduct
}

export default medicineService;