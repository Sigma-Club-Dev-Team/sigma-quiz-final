import axios from "axios";
import { METHOD } from "../types/methods";
import { ToggleStatusPayload } from "@/types";
import { SERVER_URL } from "@/lib/constants";

let store : any

export const injectStore = (_store : any) => {
  store = _store
}

class Api {
  baseURL: string;
  constructor() {
    this.baseURL = SERVER_URL;
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

  getQuizDetails = (quizId: string) => {
    const url = `/api/sigma-quiz/${quizId}/results`
    return this.publicRequest(url, METHOD.GET, {})
  }

  updateQuizStatus = (payload: ToggleStatusPayload) => {
    const url = `/api/sigma-quiz/${payload.quizId}/status`
    return this.publicRequest(url, METHOD.PUT, {
      new_status: payload.status
    })
  }
}
export const api = new Api()
export default Api;