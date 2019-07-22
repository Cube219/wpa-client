import { VuexModule, Module, Mutation } from 'vuex-module-decorators';

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
