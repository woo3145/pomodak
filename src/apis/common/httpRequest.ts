import { API_URL_NEST, API_URL_SPRING } from '@/constants';
import useBoundStore from '@/stores/useBoundStore';
import axios, { InternalAxiosRequestConfig } from 'axios';
import { ApiSuccessResponse } from '../interface/apiResponse.type';
import { AuthData } from '../services/authService';

// 인터셉터로 만료 시간 확인 및 토큰 리프레시
async function refreshTokenIfNeeded() {
  const { tokens, expiresIn, authenticate } = useBoundStore.getState();
  const now = new Date().getTime();

  if (now >= expiresIn) {
    try {
      const response = await axios.post<ApiSuccessResponse<AuthData>>(
        `${API_URL_NEST}/hororok-api/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Refresh ${tokens.refreshToken}`,
          },
        }
      );

      authenticate(
        {
          accessToken: response.data.data.access_token,
          refreshToken: response.data.data.refresh_token,
        },
        response.data.data.expiresIn
      );
      return response.data.data.access_token;
    } catch (error) {
      useBoundStore.getState().logout();
    }
  }
  return tokens.accessToken;
}
const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  const accessToken = await refreshTokenIfNeeded();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

const nestHttpRequest = axios.create({
  baseURL: API_URL_NEST,
});
const springHttpRequest = axios.create({
  baseURL: API_URL_SPRING,
});

nestHttpRequest.interceptors.request.use(requestInterceptor);
springHttpRequest.interceptors.request.use(requestInterceptor);

export { nestHttpRequest, springHttpRequest };