import { defineStore } from 'pinia'

export const useGeneratorStore = defineStore('generatorStore', {
  state: () => ({
    componentList: JSON.parse(localStorage.getItem('componentList') || 'null'),
    currentComponent: JSON.parse(localStorage.getItem('currentComponent') || 'null'),
    activeIndex: Number(localStorage.getItem('activeIndex')) || null,
    formAttrs: JSON.parse(localStorage.getItem('formAttrs') || '{}')
  }),
  actions: {
    setComponentList(data: any) {
      this.componentList = data
      localStorage.setItem('componentList', JSON.stringify(data))
    },
    setCurrentComponent(data: any) {
      this.currentComponent = data
      localStorage.setItem('currentComponent', JSON.stringify(data))
    },
    setActiveIndex(data: any) {
      this.activeIndex = data
      localStorage.setItem('activeIndex', data.toString())
    },
    setFormAttrs(data: any) {
      this.formAttrs = data
      localStorage.setItem('formAttrs', JSON.stringify(data))
    }
  }
})
