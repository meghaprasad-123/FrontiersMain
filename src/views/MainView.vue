<script setup lang="ts">
import SearchBox from '@/components/SearchBox.vue'
import AsideComponent from '@/components/AsideComponent.vue'
import MainTools from '@/components/MainTools.vue'

const components = {
  'search-box': SearchBox,
  'aside-component': AsideComponent,
  'main-tools': MainTools
}
</script>

<template>
  <div id="main-content">
    <search-box></search-box>
    <div class="mainwithaside">
      <main class="main">
        <main-tools></main-tools>
      </main>
      <aside class="aside">
        <aside-component></aside-component>
      </aside>
    </div>
  </div>
</template>
