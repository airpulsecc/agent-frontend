import { token } from '@/state/client/auth'
import axios, { AxiosError, type AxiosRequestConfig } from 'axios'

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - add auth token if available
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token from localStorage or any state management

    if (token.getToken()) {
      config.headers.Authorization = token.getHeaderString()
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login or refresh token
      token.clearToken()
    }

    if (error.response?.status === 403) {
      // Forbidden - show error message
      console.error('Access forbidden')
    }

    if (error.response?.status === 500) {
      // Server error
      console.error('Server error occurred')
    }

    return Promise.reject(error)
  },
)

// Custom instance for Orval
export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source()
  const promise = apiClient({
    ...config,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}

export type ErrorType<Error> = AxiosError<Error>
export type BodyType<BodyData> = BodyData
