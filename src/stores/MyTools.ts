import { defineStore } from 'pinia'

interface Tool {
  id: number
  icon: string
  text: string
  span: string
}

export const useMyToolsStore = defineStore('tools', {
  state: () => ({
    tools: [
      { id: 1, icon: 'trash', text: 'advanced settings', span: 'Terminology' },
      { id: 2, icon: 'trash', text: 'data', span: 'Lists' },
      { id: 3, icon: 'trash', text: 'data', span: 'Organizations' },
      { id: 4, icon: 'trash', text: 'office platforms', span: 'Accounting' }
    ] as Tool[] // Specify the type of the "tools" array as Tool[]
  }),
  getters: {
    allTools(): Tool[] {
      return this.tools
    }
  },
  actions: {
    deleteTools(id: number) {
      this.tools = this.tools.filter((tool) => tool.id !== id)
    }
  }
})
