<template>
  <q-card :class="['web-page-card', isReadGrey]">
    <div v-if="isNew">
      <q-badge color="orange" floating>New</q-badge>
    </div>
    <!-- <img :src="'https://wpa.cube219.me/' + this.info.imageUrl"> -->

    <q-card-section>
      <div class="row">
        <div class="col">
          <div class="text-h6">{{ this.info.title }}</div>
          <div class="text-subtitle2"> (사이트 이름) </div>
          <div class="text-subtitle2">{{ getDateStr }}</div>
        </div>

        <div class="col-auto">
          <q-btn :loading='loading' color="grey-7" round flat icon="more_vert">
            <q-menu
              cover auto-close
              transition-show="flip-right"
              transition-hide="flip-left"
              anchor="top right"
              self="top left"
            >
              <q-list>
                <q-item v-if="this.info.isRead == false" clickable @click="markAsRead()">
                  <q-item-section>읽음으로 표시</q-item-section>
                </q-item>
                <q-item v-else clickable @click="markAsUnread()">
                  <q-item-section>읽지 않음으로 표시</q-item-section>
                </q-item>

                <q-item clickable class="text-secondary" @click="archieve()">
                  <q-item-section>보관</q-item-section>
                </q-item>

                <q-item clickable class="text-negative" @click="remove()">
                  <q-item-section>제거</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      {{ this.info.desc }}
    </q-card-section>

    <q-card-actions vertical>
      <q-btn flat @click="readMore()">더 읽기...</q-btn>
    </q-card-actions>
  </q-card>
</template>

<style>
.web-page-card
{
  width: 100%;
  max-width: 250px;
}
</style>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import moment from 'moment'
import axios from 'axios'

@Component
export default class WebPageCard extends Vue {
  @Prop() info: any

  loading: boolean = false;

  get isReadGrey () {
    if (this.info.isRead === true) {
      return 'bg-grey-4';
    } else {
      return '';
    }
  }
  get getDateStr () {
    return moment(this.info.time).format('YYYY-MM-DD / HH:MM:SS');
  }
  get isNew () {
    const gapDay = (Date.now() - Date.parse(this.info.time)) / 86400000; // 24*60*60*1000
    if (gapDay <= 3) {
      return true;
    } else {
      return false;
    }
  }

  readMore () {
    window.open(this.info.url);
    axios.put('/api/page/read/' + this.info._id).then((response) => {
      this.info.isRead = true;
    }).catch((e) => {
      this.$q.notify({
        color: 'negative',
        icon: 'warning',
        position: 'bottom-right',
        message: '데이터를 읽어오는데 실패했습니다.'
      });
    });
  }
  markAsRead () {
    this.loading = true;
    axios.put('/api/page/read/' + this.info._id).then((response) => {
      this.loading = false;
      this.info.isRead = true;
    }).catch((e) => {
      this.loading = false;
      this.$q.notify({
        color: 'negative',
        icon: 'warning',
        position: 'bottom-right',
        message: '읽음으로 표시하는데 실패했습니다.'
      });
    });
  }
  markAsUnread () {
    this.loading = true;
    axios.put('/api/page/read/' + this.info._id, { setUnread: true }).then((response) => {
      this.loading = false;
      this.info.isRead = false;
    }).catch((e) => {
      this.loading = false;
      this.$q.notify({
        color: 'negative',
        icon: 'warning',
        position: 'bottom-right',
        message: '읽지 않음으로 표시하는데 실패했습니다.'
      });
    });
  }
  archieve () {
    this.loading = true;
    this.$axios.post('/api/page/archieved/' + this.info._id).then((res) => {
      this.loading = false;
      this.$q.notify({
        color: 'positive',
        icon: 'done',
        position: 'bottom-right',
        message: `성공적으로 보관했습니다. (${this.info.title})`
      });
    }).catch((e) => {
      this.loading = false;
      this.$q.notify({
        color: 'negative',
        icon: 'warning',
        position: 'bottom-right',
        message: '보관에 실패했습니다.'
      });
      console.log(e);
    });
  }
  remove () {
    this.loading = true;

    this.$q.dialog({
      title: '제거',
      message: '정말로 이 페이지를 제거하시겠습니까?',
      cancel: true,
      persistent: true
    }).onOk(() => {
      this.$axios.delete('/api/page/' + this.info._id).then((res) => {
        this.$q.notify({
          color: 'positive',
          icon: 'done',
          position: 'bottom-right',
          message: `성공적으로 제거했습니다. (${this.info.title})`
        });
        this.$store.commit('removePageInfos', [this.info]);
      }).catch((e) => {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          position: 'bottom-right',
          message: '제거에 실패했습니다.'
        });
        console.log(e);
      });
    }).onDismiss(() => {
      this.loading = false;
    });
  }
}
</script>
