<template>
  <div class="absolute-center q-pa-xl q-gutter-sm justify-center">
    <h3>WebPageAlerter</h3>

    <q-form @submit="onLogin" class="q-gutter-md">
      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" :disable="loggingIn" ref="inputfocus">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-toggle v-model="stayLogin" label="로그인 상태 유지" :disable="/*loggingIn*/ true" />

      <q-btn type="submit" :loading="loggingIn" color="primary" style="width: 150px">
        Login
        <template v-slot:loading>
          Loading...
          <q-spinner-facebook class="on-right" />
        </template>
      </q-btn>
    </q-form>
  </div>
</template>

<style>
.title {
  margin-bottom: 0px;
  margin-left: 40px;
}
</style>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  password: string = '';
  stayLogin: boolean = false;
  isPwd: boolean = true;
  loggingIn: boolean = false;

  onLogin () {
    this.loggingIn = true;
    this.$axios.post('/api/auth', { password: this.password }).then((response) => {
      this.$store.commit('setToken', { token: response.data.token, isSessionCookie: !this.stayLogin });

      this.$router.push('/all');
    }).catch((e) => {
      this.$q.notify({
        color: 'negative',
        icon: 'warning',
        position: 'bottom-right',
        message: `로그인에 실패했습니다. (${e.response.data})`
      });
      this.loggingIn = false;
      // @ts-ignore
      this.$refs.inputfocus.focus();
    });

    this.password = '';
  }
}
</script>
