import { ComponentItem } from '../types'
import cloneDeep from 'lodash/cloneDeep'
import { beautifierConf } from '@/utils/index.ts'
import beautify from 'js-beautify'

export const vueTemplate = (componentList: ComponentItem[]) => {
  const formAttrs = JSON.parse(localStorage.getItem('formAttrs')!)
  let template = ``
  let attrs = ``
  let script = ``
  let childStr = ``
  let rules: Record<string, any> = {}
  let formData: Record<string, any> = {}
  let cloneAttrs: any = {}
  if (componentList && componentList.length) {
    let isValue = componentList.find((item) => item.field || (item.attrs as any).seriesData)
    if (isValue)
      script = `import {ref} from 'vue'
  `
    componentList.map((item: any) => {
      cloneAttrs = cloneDeep(item.attrs)
      if (item.field) {
        formData[item.field] = item.value
        if (item.rules) {
          let cloneRules = cloneDeep(item.rules)
          cloneRules.map((item: any) => {
            if (item.pattern) {
              item.pattern = new RegExp((item.pattern as string).slice(1, -1))
            }
          })
          rules[item.field] = cloneRules
        }
      }
      for (let i in item.attrs) {
        for (let j in item.defaultProps) {
          if (i === j && item.attrs[i] === item.defaultProps[j]) {
            delete cloneAttrs[i]
          }
        }
        if (i === 'buttonText') {
          delete cloneAttrs[i]
        }
        if (item.type === 'cascader') {
          delete cloneAttrs['props']
        }
        attrs += `
      ${
        typeof cloneAttrs[i] !== 'undefined' && cloneAttrs[i] !== ''
          ? `${
              typeof cloneAttrs[i] === 'boolean'
                ? `${cloneAttrs[i] ? i : `:${i}="false"`}`
                : `${typeof cloneAttrs[i] === 'number' ? `:${i}="${cloneAttrs[i]}"` : `${i}="${cloneAttrs[i]}"`}`
            }`
          : ''
      }`
      }
      if (item.children && item.children.length && item.type !== 'cascader') {
        let childAttrs = ``
        item.children!.map((child: any) => {
          for (let i in child.attrs) {
            if ((child.attrs as any)[i]) {
              for (let j in child.defaultProps) {
                if (i !== j && child.attrs[i] !== child.defaultProps[j] && i !== 'text') {
                  childAttrs = `
              ${i}="${(child.attrs as any)[i]}"`
                }
              }
            }
          }
          childStr += `
<el-${child.type} ${childAttrs}>${
            item.type === 'cascader'
              ? ''
              : child.type !== 'option'
                ? (child.attrs as any).text
                : (child.attrs as any).label
          }</el-${child.type}>`
          childAttrs = ''
        })
      }
      template += `
    <el-form-item label="${item.label}" labelWidth="${item.labelWidth}px">
      <el-${item.type}
        ${item.field ? 'v-model=' + `"model.${item.field}"` : ''}
        ${item.type === 'cascader' ? ':props="props"' : ''}
        ${item.type === 'cascader' ? ':options="options"' : ''}
        ${attrs}>${childStr}${item.type === 'button' ? (item.attrs as any).buttonText : ''}</el-${item.type}>
                     </el-form-item>
    `
      script = `
      import { ref } from 'vue'
      let ${formAttrs.model} = ref(${JSON.stringify(formData)})
      let ${formAttrs.rules} = ref(${JSON.stringify(rules)})
      ${item.type === 'cascader' ? `let props = ref(${JSON.stringify((item.attrs as any).props)})` : ''}
      ${item.type === 'cascader' ? `let options = ref(${JSON.stringify(item.children)})` : ''}
      `
      attrs = ''
      childStr = ''
    })
  }
  template = beautify.html(template, beautifierConf.html)
  script = beautify.html(script, beautifierConf.js)
  return `
<template>
  <el-form :model="${formAttrs.model}" :rules="${formAttrs.rules}">
    ${template}
  </el-form>
</template>

<script lang="ts" setup>
  ${script}
</script>

<style scoped lang="scss"></style>
`
}

export const getCode = (componentList: ComponentItem[]) => {
  let template = ``
  let attrs = ``
  let script = ``
  let childStr = ``
  let cloneAttrs: any = {}
  let rules: Record<string, any> = {}
  let formData: Record<string, any> = {}
  let cloneStringRules: Record<string, any> = {}
  let props = ''
  let options = ''
  if (componentList && componentList.length) {
    let isValue = componentList.find((item) => item.field || (item.attrs as any).seriesData)
    if (isValue) script = ``
    componentList.map((item) => {
      cloneAttrs = cloneDeep(item.attrs)
      if (item.field) {
        formData[item.field] = item.value
        if (item.rules) {
          let cloneRules = cloneDeep(item.rules)
          let cloneRules1 = cloneDeep(item.rules)
          cloneRules.map((item) => {
            if (item.pattern) {
              item.pattern = new RegExp((item.pattern as string).slice(1, -1))
            }
          })
          cloneRules1.map((item) => {
            if (item.pattern) {
              item.pattern = (item.pattern as string).slice(1, -1)
            }
          })
          rules[item.field] = cloneRules
          cloneStringRules[item.field] = item.rules
        }
      }
      for (let i in item.attrs) {
        for (let j in item.defaultProps) {
          if (i === j && (item.attrs as any)[i] === item.defaultProps[j]) {
            delete cloneAttrs[i]
          }
        }
        if (i === 'buttonText' || i === 'props') {
          delete cloneAttrs[i]
        }
        if (item.type === 'cascader') {
          delete cloneAttrs['props']
        }
        attrs += `
      ${
        typeof cloneAttrs[i] !== 'undefined' && cloneAttrs[i] !== ''
          ? `${
              typeof cloneAttrs[i] === 'boolean'
                ? `${cloneAttrs[i] ? i : `:${i}="false"`}`
                : `${typeof cloneAttrs[i] === 'number' ? `:${i}="${cloneAttrs[i]}"` : `${i}="${cloneAttrs[i]}"`}`
            }`
          : ''
      }`
      }
      if (item.children && item.children.length && item.type !== 'cascader') {
        let childAttrs = ``
        item.children!.map((child: any) => {
          for (let i in child.attrs) {
            if ((child.attrs as any)[i]) {
              for (let j in child.defaultProps) {
                if (i !== j && child.attrs[i] !== child.defaultProps[j] && i !== 'text') {
                  childAttrs = `
              ${i}="${(child.attrs as any)[i]}"`
                }
              }
            }
          }
          childStr += `
          <el-${child.type} ${childAttrs}>
            ${
              item.type === 'cascader'
                ? ''
                : child.type !== 'option'
                  ? (child.attrs as any).text
                  : (child.attrs as any).label
            }
          </el-${child.type}>`
          childAttrs = ''
        })
      }
      if (item.type === 'cascader') {
        props = 'props'
        options = 'options'
      }
      template += `
    <el-form-item label="${item.label}" labelWidth="${item.labelWidth}px" prop="${item.field}">
      <el-${item.type}
      ${item.field ? 'v-model=' + `"model.${item.field}"` : ''}
      ${item.type === 'cascader' ? ':props="props"' : ''}
      ${attrs}
      ${item.type === 'cascader' ? ':options="options"' : ''}
      >${childStr}${item.type === 'button' ? (item.attrs as any).buttonText : ''}
      </el-${item.type}>
    </el-form-item>
    `
      script = `
      let model = ref(${JSON.stringify(formData)})
      let rules = ref(${JSON.stringify(cloneStringRules)})
      ${item.type === 'cascader' ? `let props = ref(${JSON.stringify((item.attrs as any).props)})` : ''}
      ${item.type === 'cascader' ? `let options = ref(${JSON.stringify(item.children)})` : ''}
      `
      attrs = ''
      childStr = ''
    })
  }
  template = beautify.html(template, beautifierConf.html)
  return {
    template: `
      <el-form :model="model" :rules="rules">${template}</el-form>
    `,
    script: `
      defineComponent({
        setup() {
          ${script}
          return {
            model,
            rules,
            ${props ? props + ',' : ''}
            ${options ? options + ',' : ''}
          }
        }
      })
    `,
    style: ''
  }
}
