<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { useSegmentStore } from '@/stores/SegmentStore'
import { useSearchStore } from '@/stores/SearchStore'
import { useProductStore } from '@/stores/ProductStore'

// Reactive variables
let selectedProduct = ref('')
const bookmarkpage = ref('main')
const store = useSearchStore()
const ProductStore = useProductStore()
const Segments = useSegmentStore()
const imageUrl = ref(
  'https://gist.githack.com/ManojSreekumarK/c910dfc0bde5ceb9f29960ae524a9aa7/raw/e6898b177645160c1d46e14826400dc05ca2a365/bookmark2.svg'
)
const activeSegmentId = ref('00000')
// Arrays
const buttons = ref([
  { id: '00000', label: 'All', active: true },
  { id: '1es23', label: 'Office platforms', active: false },
  { id: '1xs2e', label: 'Advanced Settings', active: false },
  { id: 'xs2e1', label: 'Data', active: false },
  {
    id: 'xf2e1',
    label: 'More',
    active: false
  }
])
// Computed Properties
const searchQuery = computed(() => store.getSearchQuery)
const displayedProducts = computed(() => {
  // for all products and segment wise filtering
  if (bookmarkpage.value === 'main' && searchQuery.value === '') {
    if (activeSegmentId.value) {
      return ProductStore.getProductsBySegmentId(activeSegmentId.value)
    } else {
      return ProductStore.apiData
    }
  } else if (bookmarkpage.value === 'saved' && searchQuery.value === '') {
    // for saved products and segment wise filtering
    if (activeSegmentId.value) {
      return ProductStore.getProductsBySegmentId(activeSegmentId.value).filter(
        (product) => product.saved
      )
    } else {
      return ProductStore.apiData
    }
  }
  if (bookmarkpage.value === 'main' && searchQuery.value != '') {
    // for searching using product name in all products
    if (activeSegmentId.value) {
      return ProductStore.getProductsBySegmentId(activeSegmentId.value).filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    } else {
      return ProductStore.apiData
    }
  } else if (bookmarkpage.value === 'saved' && searchQuery.value != '') {
    // for searching using product name in saved products
    if (activeSegmentId.value) {
      return ProductStore.getProductsBySegmentId(activeSegmentId.value)
        .filter((product) => product.saved)
        .filter((product) =>
          product.productName.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    } else {
      return ProductStore.apiData
    }
  }
})

// Methods
// to load Product on a new tab
const openInNewTab = (productId: string) => {
  const currentURL = window.location.href + 'Product/' + productId
  window.open(currentURL, '_blank')
}
// adding active style to each button clicked
const handleButtonClick = (buttonId: string) => {
  buttons.value.forEach((button) => {
    button.active = button.id === buttonId
  })
}
// Main content logic  for products, search and saved
const displaySegmentProducts = (buttonId: string) => {
  activeSegmentId.value = buttonId
}

// to toggle image of saved button
const toggleBookmarkPage = () => {
  bookmarkpage.value = bookmarkpage.value === 'main' ? 'saved' : 'main'
}
const toggleImageSrc = () => {
  imageUrl.value =
    imageUrl.value ===
    'https://gist.githack.com/ManojSreekumarK/c910dfc0bde5ceb9f29960ae524a9aa7/raw/e6898b177645160c1d46e14826400dc05ca2a365/bookmark2.svg'
      ? 'https://gist.githack.com/ManojSreekumarK/9517e02e360a00c43b9a0823eb611ee8/raw/3b19a947877d131ae21178cdb22992f7a47901f6/uturn.svg'
      : 'https://gist.githack.com/ManojSreekumarK/c910dfc0bde5ceb9f29960ae524a9aa7/raw/e6898b177645160c1d46e14826400dc05ca2a365/bookmark2.svg'
}

// using both segment array of objects and products api to list products
const getSegmentIcon = (segmentId: string) => {
  const segment = Segments.Segments.find((item) => item.id === segmentId)
  return segment ? segment.icon : ''
}
const getSegmentName = (segmentId: string) => {
  const segment = Segments.Segments.find((item) => item.id === segmentId)
  return segment ? `${segment.displayName}` : ''
}
// For bookmark functionality and styling
const toggleBookmark = (productId: string) => {
  ProductStore.toggleBookmark(productId)
  ProductStore.persistState()
}

// Lifecycle hooks
onMounted(async () => {
  await ProductStore.fetchData()
  ProductStore.loadState()
})
</script>

<template>
  <!-- Total tools -->
  <h1 class="total_tools">
    <span id="total">{{ displayedProducts?.length }}</span> tools
  </h1>
  <!-- Filter buttons -->
  <div class="filterwaraper">
    <button
      class="saved_wraper"
      @click="
        () => {
          toggleBookmarkPage()
          toggleImageSrc()
        }
      "
    >
      <div class="saved">
        <img :src="imageUrl" alt="saved" />
      </div>
    </button>
    <div class="filters">
      <button
        v-for="button in buttons"
        class="filterbtn"
        :key="button.id"
        :class="{ filter_active: button.active }"
        @click="
          () => {
            handleButtonClick(button.id)
            displaySegmentProducts(button.id)
          }
        "
      >
        {{ button.label }}
        <img
          v-if="button.id === 'xf2e1'"
          src="https://gist.githack.com/ManojSreekumarK/6c2a9d8262837eadecf1b00a249dec40/raw/b5dda76f173a79bc720aeb019349005e385d7f13/dots.svg"
          alt="Additional Image"
        />
      </button>
    </div>
  </div>
  <!-- All products -->
  <section class="tool_cards" v-if="bookmarkpage === 'main'">
    <div v-for="product in displayedProducts" :key="product.productId" class="tool_card">
      <div class="tool_icon_container" @click="openInNewTab(product.productId)">
        <img
          :src="`src/assets/icons/${getSegmentIcon(product.segmentId)}`"
          alt="Segment.displayName"
        />
      </div>
      <div class="tool_card_content" @click="openInNewTab(product.productId)">
        <span>{{ getSegmentName(product.segmentId) }}</span>
        <h2>{{ product.productName }}</h2>
        <p>
          {{ product.description }}
        </p>
      </div>
      <div class="bk">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bookmark"
          :class="{ bookmark_active: product.saved }"
          :data-id="product.productId"
          @click="toggleBookmark(product.productId)"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#a7a7a7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          />
        </svg>
      </div>
    </div>
    <h2 v-if="displayedProducts?.length === 0">No Data Found</h2>
  </section>
  <!-- Saved Products -->
  <section class="saved_cards" v-if="bookmarkpage === 'saved'">
    <div v-for="product in displayedProducts" :key="product.productId" class="tool_card">
      <div class="tool_icon_container" @click="openInNewTab(product.productId)">
        <img
          :src="`src/assets/icons/${getSegmentIcon(product.segmentId)}`"
          alt="Segment.displayName"
        />
      </div>
      <div class="tool_card_content" @click="openInNewTab(product.productId)">
        <span>{{ getSegmentName(product.segmentId) }}</span>
        <h2>{{ product.productName }}</h2>
        <p>
          {{ product.description }}
        </p>
      </div>
      <div class="bk">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bookmark"
          :class="{ bookmark_active: product.saved }"
          :data-id="product.productId"
          @click="toggleBookmark(product.productId)"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#a7a7a7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          />
        </svg>
      </div>
    </div>
    <h2 v-if="displayedProducts?.length === 0">No Bookmark Found</h2>
  </section>
</template>
