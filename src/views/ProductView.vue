<template>
  <div>
    <!-- <img :src="'src/assets/icons/' + `${getSegmentIcon(displayedProduct?.segmentId)}`" /> -->
    <img :src="getSegmentIcon(displayedProduct?.segmentId)" /><br />
    <span>{{ getSegmentName(displayedProduct?.segmentId) }}</span>
    <h2>{{ displayedProduct?.productName }}</h2>
    <p>{{ displayedProduct?.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, onMounted, ref, onBeforeMount } from 'vue'
import { useProductStore } from '@/stores/ProductStore'
import { useSegmentStore } from '@/stores/SegmentStore'

const ProductStore = useProductStore()
const Segments = useSegmentStore()
const props = defineProps(['pid'])
// get product by id
const displayedProduct = computed(() => {
  return ProductStore.getProductsById(props.pid)
})
//  get segment icon  using id
const getSegmentIcon = (segmentId: string | undefined) => {
  const segment = Segments.Segments.find((item) => item.id === segmentId)
  return segment ? new URL(`../assets/icons/${segment.icon}`, import.meta.url).href : ''
}
// get segment name using id
const getSegmentName = (segmentId: string | undefined) => {
  const segment = Segments.Segments.find((item) => item.id === segmentId)
  return segment ? segment.displayName : ''
}

onMounted(async () => {
  await ProductStore.fetchData()
  ProductStore.loadState()
})
</script>

<style lang="scss" scoped>
div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  background-color: white;
  padding: 30px;
  border-radius: 5px;

  P {
    text-align: justify;
  }
  h2 {
    margin: 10px 0;
  }
}
</style>
