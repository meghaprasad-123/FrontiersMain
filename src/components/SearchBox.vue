<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSearchStore } from '@/stores/SearchStore'

const searchQuery = ref('')
const store = useSearchStore()

// Watch for changes in the search query
watch(searchQuery, (newValue) => {
  if (newValue.length > 3 || newValue.length == 0) {
    store.setSearchQuery(newValue)
  }
})
</script>

<template>
  <div class="search-wrapper">
    <div class="searchbar">
      <img
        src="https://gist.githack.com/ManojSreekumarK/33fbb65288e7ed7e03610ce20618ad05/raw/be627e58be0933a3cd5768386d91a1eb43113c27/search.svg"
        alt="search"
      />
      <input type="text" v-model="searchQuery" placeholder="Search ..." class="searchbar_input" />
    </div>
    <p v-if="searchQuery.length < 3" class="validation">Type at least 3 characters</p>
  </div>
</template>
