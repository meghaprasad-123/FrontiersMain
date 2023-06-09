import { defineStore } from 'pinia'

interface Segment {
  id: string
  displayName: string
  icon: string
  saved: boolean
}

export const useSegmentStore = defineStore('Segment', {
  state: () => ({
    Segments: [
      {
        id: '1es23',
        displayName: 'Office platforms',

        icon: 'computer.svg',
        saved: true
      },
      {
        id: '1xs2e',
        displayName: 'Advanced settings',

        icon: 'cog.svg',
        saved: false
      },
      {
        id: 'xs2e1',
        displayName: 'Data',

        icon: 'servers.svg',
        saved: false
      },
      {
        id: 'xf2e1',
        displayName: 'Business workflows Business workflows Business workflows Business workflows',

        icon: 'businessworkflow.svg',
        saved: true
      }
    ]
  }),
  getters: {
    saved(): Segment[] {
      return this.Segments.filter((t) => t.saved)
    }
  },
  actions: {
    bookmark(id: string) {
      const segment = this.Segments.find((t) => t.id === id)
      if (segment) {
        segment.saved = !segment.saved
        this.persistState() // Save the state to sessionStorage
        console.log('bookmarked')
      }
    },
    persistState() {
      const state = this.$state // Get the current state
      sessionStorage.setItem('segmentStore', JSON.stringify(state)) // Save the state to sessionStorage
    },
    loadState() {
      const storedState = sessionStorage.getItem('segmentStore')
      if (storedState) {
        this.$patch(JSON.parse(storedState)) // Load the stored state into the store
      }
    }
  }
})
