import { api } from "@/api";

// export const fetchAppointments = async (payload: CarPayload) => {
//   const api = new Api();
//   const response = await api.getCars(payload);

//   return response.data.data.cars;
// };

export const fetchSuperAdmin = async (id: string) => {
//   const response = await api.getMerchant();
//   return response.data;
    return {}
};

const authService = {
  fetchSuperAdmin,
};

export default authService;
