<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const components = {
  'nav-bar': NavBar
}
</script>

<template>
  <nav-bar></nav-bar>
  <RouterView />
</template>

<style lang="scss">
@import '@/assets/styles/base/base-dir.scss';
@import '@/assets/styles/layouts/layout-dir.scss';
@import '@/assets/styles/modules/modules-dir.scss';
@import '@/assets/styles/responsive/responsive-dir.scss';
</style>
