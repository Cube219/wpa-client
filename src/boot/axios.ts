import axios, { AxiosStatic } from 'axios';

export default async ({ Vue }: {[key: string]: any}) => {
  Vue.prototype.$axios = axios;
  // axios.defaults.baseURL = 'https://wpa.cube219.me/';
  axios.defaults.baseURL = 'https://localhost/';
};

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosStatic;
  }
}
