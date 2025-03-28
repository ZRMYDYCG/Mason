import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MasonColumn from './index.vue'
import { ElScrollbar } from 'element-plus'

describe('MasonColumn', () => {
  // 基础渲染测试
  it('renders correctly with default props', () => {
    const wrapper = mount(MasonColumn)

    // 验证组件渲染
    expect(wrapper.find('.mason-column').exists()).toBe(true)
    expect(wrapper.find('.mason-column-wrapper').exists()).toBe(true)

    // 默认情况下应该渲染 el-scrollbar
    expect(wrapper.findComponent(ElScrollbar).exists()).toBe(true)

    // 验证插槽区域存在
    expect(wrapper.find('.mason-column__header').exists()).toBe(true)
    expect(wrapper.find('.mason-column__body').exists()).toBe(true)
    expect(wrapper.find('.mason-column__footer').exists()).toBe(true)
  })

  // props 测试
  it('renders without scrollbar when scrollable is false', () => {
    const wrapper = mount(MasonColumn, {
      props: {
        scrollable: false
      }
    })

    // 不应该渲染 el-scrollbar
    expect(wrapper.findComponent(ElScrollbar).exists()).toBe(false)

    // 应该直接渲染 body
    expect(wrapper.find('.mason-column__body').exists()).toBe(true)
  })

  // 插槽内容测试
  it('renders slot content correctly', () => {
    const wrapper = mount(MasonColumn, {
      slots: {
        default: 'Main Content',
        header: 'Header Content',
        footer: 'Footer Content'
      }
    })

    // 验证插槽内容
    expect(wrapper.find('.mason-column__header').text()).toBe('Header Content')
    expect(wrapper.find('.mason-column__body').text()).toBe('Main Content')
    expect(wrapper.find('.mason-column__footer').text()).toBe('Footer Content')
  })

  // 样式类测试
  it('has correct CSS classes and structure', () => {
    const wrapper = mount(MasonColumn)

    // 验证类名结构
    expect(wrapper.find('.mason-column > .mason-column-wrapper').exists()).toBe(true)
    expect(wrapper.find('.mason-column-wrapper > .mason-column__header').exists()).toBe(true)
    expect(wrapper.find('.mason-column-wrapper > .el-scrollbar').exists()).toBe(true)
    expect(wrapper.find('.mason-column-wrapper > .mason-column__footer').exists()).toBe(true)

    // 验证 body 在 scrollbar 内部
    expect(wrapper.findComponent(ElScrollbar).find('.mason-column__body').exists()).toBe(true)
  })

  // 边界情况测试
  it('handles empty slots gracefully', () => {
    const wrapper = mount(MasonColumn, {
      slots: {
        default: '',
        header: '',
        footer: ''
      }
    })

    // 区域仍然应该渲染
    expect(wrapper.find('.mason-column__header').exists()).toBe(true)
    expect(wrapper.find('.mason-column__body').exists()).toBe(true)
    expect(wrapper.find('.mason-column__footer').exists()).toBe(true)

    // 内容应该为空
    expect(wrapper.find('.mason-column__header').text()).toBe('')
    expect(wrapper.find('.mason-column__body').text()).toBe('')
    expect(wrapper.find('.mason-column__footer').text()).toBe('')
  })
})
