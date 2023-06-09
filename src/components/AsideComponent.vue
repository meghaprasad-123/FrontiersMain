<template>
  <div class="aside_header">My tools</div>
  <div class="mytool_cards">
    <div v-for="tool in store.allTools" :key="tool.text" class="mytool_card">
      <img @click="deleteTool(tool.id)" :src="getIconUrl(tool.icon)" :alt="tool.icon" />
      <p>{{ tool.text }}</p>
      <span>{{ tool.span }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMyToolsStore } from '@/stores/MyTools'

// Create an instance of your store
const store = useMyToolsStore()

// Function to get the URL for the tool icon
const getIconUrl = (icon: string) => {
  return `https://gist.githack.com/ManojSreekumarK/d8fb81262a8f8e8b40529a100c8cf76b/raw/f10c54d1a65ef7652b2d8dc49529a369c944f6c7/${icon}.svg`
}

// Action to delete a tool
const deleteTool = (id: number) => {
  store.deleteTools(id)
}
</script>
