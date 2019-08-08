import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Cookies } from 'quasar';
import axios from 'axios';

interface WebPageInfo {
  _id: string;
  siteId: string;
  title: string;
  url: string;
  imageUrl: string;
  desc: string;
  category: string;
  time: Date;
  isRead: boolean;
}

@Module({ name: 'pageInfos' })
export default class PageInfos extends VuexModule {
  pages: WebPageInfo[] = [];
  token: string = '';

  @Mutation
  setToken(params: {token: string, isSessionCookie: boolean} ) {
    console.log(params);
    this.token = params.token;

    if (params.isSessionCookie === false) {
      Cookies.set('auth_token', params.token, { expires: 15 });
    } else {
      Cookies.set('auth_token', params.token);
    }
  }

  @Mutation
  setTokenFromCookie() {
    this.token = Cookies.get('auth_token');
    if (this.token === undefined) {
      this.token = '';
    }
  }

  get getToken() {
    return this.token;
  }

  @Mutation
  addPageInfos(p: WebPageInfo[]) {
    this.pages = this.pages.concat(p);
  }
  @Mutation
  removePageInfos(p: WebPageInfo[]) {
    p.forEach(e => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.pages.length; i++) {
        if (this.pages[i]._id === e._id) {
          this.pages.splice(i, 1);
          break;
        }
      }
    });
  }
  @Mutation
  clearPageInfos() {
    this.pages = [];
  }

  get lastPageId() {
    if (this.pages.length === 0) {
      return null;
    }
    return this.pages[this.pages.length - 1]._id;
  }
}
