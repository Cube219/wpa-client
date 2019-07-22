<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Web Page Alerter
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Main</q-item-label>
        <!-- <q-item clickable tag="a" target="_blank" href="https://quasar.dev"> -->
        <q-item v-ripple clickable
          :active="currentLink === 'Unreaded pages'"
          @click="currentLink = 'Unreaded pages'"
          active-class="current-link"
          to="all"
        >
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Unreaded pages</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple clickable
          :active="currentLink === 'Archieved pages'"
          @click="currentLink = 'Archieved pages'"
          active-class="current-link"
          to="archieved"
        >
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Archieved pages</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-expansion-item label="Catetories">
          <q-item v-ripple :inset-level="1" clickable
            :active="currentLink === 'Categories/Develop/Graphics'"
            @click="currentLink = 'Categories/Develop/Graphics'"
            active-class="current-link"
          >
            <q-item-section>
              <q-item-label>Develop/Graphics</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple :inset-level="1" clickable
            :active="currentLink === 'Categories/Developer\'s blog'"
            @click="currentLink = 'Categories/Developer\'s blog'"
            active-class="current-link"
          >
            <q-item-section>
              <q-item-label>Developer's blog</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-separator spaced />

        <q-expansion-item label="Web Sites">
          <q-item v-ripple :inset-level="1" clickable
            :active="currentLink === 'Web Sites/Web Site 1'"
            @click="currentLink = 'Web Sites/Web Site 1'"
            active-class="current-link"
          >
            <q-item-section>
              <q-item-label>Web Site 1</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple :inset-level="1" clickable
            :active="currentLink === 'Web Sites/Web Site 2'"
            @click="currentLink = 'Web Sites/Web Site 2'"
            active-class="current-link"
          >
            <q-item-section>
              <q-item-label>Web Site 2</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-separator spaced />

        <q-item-label header>Setting</q-item-label>
        <q-item v-ripple clickable
            :active="currentLink === 'Setting/Web Site'"
            @click="currentLink = 'Setting/Web Site'"
            active-class="current-link"
          >
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Web Site</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple clickable
            :active="currentLink === 'Setting/Page'"
            @click="currentLink = 'Setting/Page'"
            active-class="current-link"
          >
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Page</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { openURL } from 'quasar'

import Vue from 'vue'

export default Vue.extend({
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      currentLink: 'Unreaded pages'
    }
  },
  methods: {
    openURL
  }
})
</script>

<style>
.current-link
{
  color:white;
  background: #F2C037;
}
</style>
