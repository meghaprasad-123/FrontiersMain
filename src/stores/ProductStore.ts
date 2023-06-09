import { defineStore } from 'pinia'

interface Product {
  productId: string
  productName: string
  description: string
  url: string
  segmentId: string
  saved: boolean
}

export const useProductStore = defineStore('Product', {
  state: () => ({
    apiData: [] as Product[]
  }),
  actions: {
    async fetchData() {
      try {
        const response = await fetch('https://mocki.io/v1/6f46c778-2ec4-4690-9dcb-de755e0298e7')
        const data = await response.json()
        this.apiData = data.map((product: Product) => ({
          ...product,
          saved: false
        }))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    toggleBookmark(productId: string) {
      const product = this.apiData.find((p) => p.productId === productId)
      if (product) {
        product.saved = !product.saved
        this.persistState()
      }
    },
    persistState() {
      const state = this.apiData
      sessionStorage.setItem('productStore', JSON.stringify(state))
    },
    loadState() {
      const storedState = sessionStorage.getItem('productStore')
      if (storedState) {
        this.apiData = JSON.parse(storedState)
      }
    }
  },
  getters: {
    getProductsBySegmentId:
      (state) =>
      (segmentId: string): Product[] => {
        if (segmentId === '00000') {
          return state.apiData
        }
        return state.apiData.filter((product) => product.segmentId === segmentId)
      },
    getProductsById:
      (state) =>
      (productId: string): Product | undefined => {
        return state.apiData.find((product) => product.productId === productId)
      }
  }
})
