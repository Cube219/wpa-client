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
        <q-item v-ripple clickable
          :active="currentLink === 'All pages'"
          @click="currentLink = 'All pages'"
          active-class="current-link"
          to="all"
        >
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>
          <q-item-section>
            <q-item-label>모든 페이지</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple clickable
          :active="currentLink === 'Archieved pages'"
          @click="currentLink = 'Archieved pages'"
          active-class="current-link"
          to="archieved"
        >
          <q-item-section avatar>
            <q-icon name="save_alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>보관된 페이지</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item label="Web Sites" icon="fas fa-window-maximize" expand-separator>
          <q-item v-ripple :inset-level="1" dense clickable
            :active="currentLink === 'Web Sites/Web Site 1'"
            @click="currentLink = 'Web Sites/Web Site 1'"
            active-class="current-link"
          >
            <q-item-section>
              <q-item-label>Web Site 1</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple :inset-level="1" dense clickable
            :active="currentLink === 'Web Sites/Web Site 2'"
            @click="currentLink = 'Web Sites/Web Site 2'"
            active-class="current-link"
          >
            <q-item-section>
              <q-item-label>Web Site 2</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item label="Settings" icon="fas fa-cog" expand-separator>
          <q-item v-ripple :inset-level="1" dense clickable
              :active="currentLink === 'Setting/Web Site'"
              @click="currentLink = 'Setting/Web Site'"
              active-class="current-link"
            >
            <q-item-section>
              <q-item-label>Web Site</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple :inset-level="1" dense clickable
              :active="currentLink === 'Setting/Page'"
              @click="currentLink = 'Setting/Page'"
              active-class="current-link"
            >
            <q-item-section>
              <q-item-label>Page</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
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
