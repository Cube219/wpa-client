import axios, { AxiosResponse, AxiosStatic } from 'axios';
import store from '../store';

export default async ({ Vue }: {[key: string]: any}) => {
  Vue.prototype.$axios = axios;
  if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost/';
  } else {
    axios.defaults.baseURL = 'https://wpa-server.cube219.me/';
  }

  // Token 넣는 부분
  axios.interceptors.request.use((config) => {
    let token: string = store().getters.getToken;
    if (token === '') {
      store().commit('setTokenFromCookie');
      token = store().getters.getToken;
    }
    config.headers['x-access-token'] = store().getters.getToken;

    return config;
  });

  // Token이 잘못되었을 경우
  axios.interceptors.response.use(undefined,
  (error) => {
    const res: AxiosResponse<any> = error.response;

    if (res.status === 401) {
      let msg: string;
      if (res.statusText === 'Token Expired') {
        msg = '로그인이 만료되었습니다. 다시 로그인해주세요.';
      } else {
        msg = '로그인이 필요합니다. 로그인해주세요.';
      }

      window.alert(msg);
      window.location.href = '/login';
    }

    return Promise.reject(error);
  });
};

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosStatic;
  }
}
