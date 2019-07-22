<template>
  <q-page class="flex flex-center q-pa-md">
    <q-list bordered class="full-width">
      <web-site-info></web-site-info>
      <web-site-info></web-site-info>
      <web-site-info></web-site-info>
      <web-site-info></web-site-info>
      <web-site-info></web-site-info>
    </q-list>
  </q-page>
</template>

<style>
</style>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import WebSiteInfo from '../components/WebSiteInfo.vue'

@Component({
  components: { WebSiteInfo }
})
export default class Setting extends Vue {
}
</script>
