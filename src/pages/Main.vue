<template>
  <q-page>
    <q-pull-to-refresh @refresh="onRefresh">
      <h3 class="title"> {{ this.title }} </h3>

      <div class="category text-h6">
        <q-breadcrumbs active-color="black" separator-color="black">
          <q-icon name="widgets" size="25px" />

          <q-breadcrumbs-el v-for="str in currentCategoryList" :key="str" :label="str" />

          <q-popup-proxy ref="categoryPopup">
            <category-tree-menu :currentCategory.sync="currentCategory" v-on:close="$refs.categoryPopup.hide()"></category-tree-menu>
          </q-popup-proxy>
        </q-breadcrumbs>
      </div>

      <q-infinite-scroll @load="onLoad" ref="infscroll">
        <div class="q-pa-xl row items-start q-gutter-lg">
          <web-page-card v-for="(item, index) in this.$store.state.pageInfos.pages" :key="index" :info="item"></web-page-card>
        </div>

        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>

      <q-btn
        color="primary" round size="lg" icon="add"
        class="fixed-bottom-right add-page-btn"
        @click="showAddPage"
      />
    </q-pull-to-refresh>
  </q-page>
</template>

<style>
.title {
  margin-bottom: 0px;
  margin-left: 40px;
}
.category {
  margin-left: 40px;
}
.add-page-btn {
  right: 50px;
  bottom: 50px;
}
</style>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import WebPageCard from './../components/WebPageCard.vue'
import AddPageModal from './../components/AddPageModal.vue'
import CategoryTreeMenu from './../components/CategoryTreeMenu.vue'

@Component({
  components: { WebPageCard, CategoryTreeMenu }
})
export default class Main extends Vue {
  mode: string = 'All';
  currentCategory: string = '';
  currentCategoryList: string[] = ['전체'];

  created () {
    this.$axios.get('/api/category').then((response) => {
      this.$store.commit('setCategoryList', response.data);
    }).catch((e) => {
      this.$q.notify({
        color: 'negative',
        icon: 'warning',
        position: 'bottom-right',
        message: `카테고리 데이터를 읽어오는데 실패했습니다. (${e.response.data})`
      });
      console.log(e);
    });
  }

  @Watch('$route')
  onRouteChanged (newVal: any) {
    if (newVal.path === '/all') {
      this.mode = 'All';
    } else if (newVal.path === '/archieved') {
      this.mode = 'Archieved';
    }

    this.refreshList();
  }

  @Watch('currentCategory')
  onCurrentCategoryChanged (newVal: string) {
    this.currentCategoryList = newVal.split('/');

    console.log(this.currentCategoryList);
    if (this.currentCategoryList[0] === '') {
      this.currentCategoryList[0] = '전체';
    }

    this.refreshList();
  }

  onLoad (index: Number, done:(stop: boolean)=>void) {
    this.$axios.get(this.pageUrl, { params: { afterId: this.$store.getters.lastPageId, count: 8, category: this.currentCategory } }).then((response) => {
      if (response.data.length === 0) {
        done(true);
      } else {
        this.$store.commit('addPageInfos', response.data);
        done(false);
      }
    }).catch((e) => {
      this.$q.notify({
        color: 'negative',
        icon: 'warning',
        position: 'bottom-right',
        message: `데이터를 읽어오는데 실패했습니다. (${e.response.data})`
      });
      console.log(e);
    });
  }

  onRefresh (done: ()=>void) {
    this.refreshList();
    done();
  }

  get title () {
    if (this.mode === 'All') {
      return '모든 페이지';
    } else if (this.mode === 'Archieved') {
      return '보관된 페이지';
    }

    return 'undefined page';
  }
  get pageUrl () {
    if (this.mode === 'All') {
      return '/api/pages';
    } else if (this.mode === 'Archieved') {
      return '/api/pages/archieved'
    }

    return '/api/pages';
  }

  showAddPage () {
    this.$q.dialog({
      component: AddPageModal
    });
  }

  refreshList () {
    this.$store.commit('clearPageInfos');

    // @ts-ignore
    this.$refs.infscroll.reset();
    // @ts-ignore
    this.$refs.infscroll.resume();
    // @ts-ignore
    this.$refs.infscroll.trigger();
  }
}
</script>
