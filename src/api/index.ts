import axios from "axios";
import { METHOD } from "../types/methods";
import { PaginationPayload } from "@/types";

let store : any

export const injectStore = (_store : any) => {
  store = _store
}

class Api {
  baseURL: string;
  constructor() {
    this.baseURL = 'https://sigma-website-backend-51b4af465e71.herokuapp.com';
  }

  initializeInstance = () => {
    let baseURL = this.baseURL;

    const state = store.getState()

    const instance = axios.create({
      baseURL,
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${state.auth.token}`
      },
    });

    instance.interceptors.request.use(
      (config: any) => {
        return config;
      },
      (error: any) => {
        console.error(error);

        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use((config: any) => {
        return config;
      },
      (error: any) => {
        console.error(error);

        if (error.response?.status === 401) {
          error.response.logUserOut = true
        }

        return Promise.reject(error);
      }
    );

    return instance;
  };

  publicRequest = (url: string, method: string, data: any) => {
    const instance = this.initializeInstance();
    return instance({
      url,
      method,
      data,
    });
  };

  // quizzes


  getAllQuizzes = () => {
    const url = '/api/sigma-quiz'
    return this.publicRequest(url, METHOD.GET, {})
  }

  getCategories = () => {
    const url = '/inventory/categories'
    return this.publicRequest(url, METHOD.GET, {})
  }

  getTestCategories = () => {
    const url = '/tc/test-categories'
    return this.publicRequest(url, METHOD.GET, {})
  }

  getDoctors = () => {
    const url = '/doctor'
    return this.publicRequest(url, METHOD.GET, {})
  }

  getPharmacies = (payload: PaginationPayload | null) => {
    const url = `/pharmacy/all`
    return this.publicRequest(url, METHOD.POST, {
      page: payload?.page,
      per_page: payload?.perPage,
      status: payload?.status
    })
  }

  getTestCenters = (payload: PaginationPayload | null) => {
    const url = payload ? `/tc/test-centers?page=${payload.page}&per_page=${payload.perPage}` : `/tc/test-centers`
    return this.publicRequest(url, METHOD.GET, {})
  }

  getProducts = (payload: PaginationPayload | null) => {
    const url = `/inventory/all`
    return this.publicRequest(url, METHOD.POST, {
      page: payload?.page, 
      per_page: payload?.perPage,
      ...(payload?.status && payload.status[0] !== 'all' ? {status: payload.status} : {} )
    })
  }

  getProduct = (id: string) => {
    const url = `/inventory/single?product_id=${id}`
    return this.publicRequest(url, METHOD.GET, {})
  }

  getBookingStats = () => {
    const url = `/tc/bookings/stats`
    return this.publicRequest(url, METHOD.GET, {})
  }

  getPrescriptions = (payload: PaginationPayload | null) => {
    const url = `/prescription/all`
    return this.publicRequest(url, METHOD.POST, {
      page: payload?.page, 
      per_page: payload?.perPage, 
      status: payload?.status ?? ['all'], 
      ...(payload?.date?.length===2 ? {date: payload.date} : {})
    })
  }

  getBookingTests = (payload: PaginationPayload | null) => {
    const url = `/tc/bookings`
    return this.publicRequest(url, METHOD.POST, {
      page: payload?.page, 
      per_page: payload?.perPage, 
      ...(payload?.status ? {status: payload.status} : {} )
    })
  }

  getOrders = (payload: PaginationPayload | null) => {
    const url = `/order/sa`
    return this.publicRequest(url, METHOD.POST, {
      page: payload?.page, 
      per_page: payload?.perPage,
      ...(payload?.status ? {status: payload.status} : {} )
    })
  }

  getConsultations = (payload: PaginationPayload | null) => {
    const url = `/consultation/sa`
    return this.publicRequest(url, METHOD.POST, {
      page: payload?.page, 
      per_page: payload?.perPage,
      ...(payload?.status && payload.status[0] !== 'all' ? {status: payload.status} : {} )
    })
  }

  // getTestsd = (payload: PaginationPayload | null) => {
  //   const url = `/tc/tests`
  //   return this.publicRequest(url, METHOD.POST, {
  //     page: payload?.page, 
  //     per_page: payload?.perPage,
  //     ...(payload?.status ? {status: payload.status} : {} )
  //   })
  // }

  getTests = (payload: PaginationPayload | null) => {
    const url = payload ? `/tc/tests?page=${payload.page}&per_page=${payload.perPage}` : `/tc/tests`
    return this.publicRequest(url, METHOD.GET, {})
  }

  getTest = (id: string) => {
    const url = `/tc/test?test_id=${id}`
    return this.publicRequest(url, METHOD.GET, {})
  }
}
export const api = new Api()
export default Api;