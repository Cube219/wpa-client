import axios, { AxiosStatic } from 'axios';

export default async ({ Vue }: {[key: string]: any}) => {
  Vue.prototype.$axios = axios;
  if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost/';
  } else {
    axios.defaults.baseURL = 'https://wpa-server.cube219.me/';
  }
};

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosStatic;
  }
}
