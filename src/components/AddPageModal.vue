<template>
  <q-dialog :persistent="adding" ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">새 페이지 보관</div>
      </q-card-section>

      <q-form>
        <q-card-section class="q-gutter-md">
            <q-input
              filled
              dense
              v-model="pageUrl"
              label="URL"
              :disable="adding"
            />
            <q-input
              filled
              dense
              v-model="category"
              label="Category"
              :disable="adding"
            />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat color="primary" type="submit" :loading="adding" @click="onOKClick">
            추가
            <template v-slot:loading>
              <q-spinner-facebook class="on-right" />
            </template>
          </q-btn>
          <!-- TODO: submit 취소 기능 추가(지금은 submit중에는 disable되어있음) -->
          <q-btn flat color="primary" label="취소" :disable="adding" @click="onCancelClick" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style>
</style>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class AddPageModal extends Vue {
  pageUrl: string = '';
  category: string = '';
  adding: boolean = false;

  show () {
    // @ts-ignore
    this.$refs.dialog.show();
  }
  hide () {
    // @ts-ignore
    this.$refs.dialog.hide();
  }
  onDialogHide () {
    this.$emit('hide')
  }
  onOKClick () {
    this.adding = true;

    this.$axios.post('/api/page/archieved', { url: this.pageUrl, category: this.category })
      .then((res) => {
        this.adding = false;
        this.$q.notify({
          color: 'positive',
          icon: 'done',
          position: 'bottom-right',
          message: `성공적으로 보관했습니다. (${res.data.title})`
        });

        this.$emit('ok')
        this.hide()
      })
      .catch((e) => {
        this.adding = false;
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          position: 'bottom-right',
          message: `보관에 실패했습니다. (${e.response.data})`
        });
        console.log(e);
      });
  }
  onCancelClick () {
    this.hide()
  }
}
</script>
