<template>
  <div>
    <q-expansion-item group="setgroup">
      <template v-slot:header>
          <q-item-section>
            테스트 페이지
          </q-item-section>

          <q-item-section>
            Wifi settings
          </q-item-section>
        </template>
    </q-expansion-item>
    <q-separator />
  </div>
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
import { Component } from 'vue-property-decorator'

@Component
export default class WebSiteInfo extends Vue {
  // name: 'WebSiteInfo'
}
</script>
