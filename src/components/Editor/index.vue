<!-- 富文本编辑器 插件地址：https://www.wangeditor.com/ -->
<template>
  <div class="editor-wrapper">
    <Toolbar
      class="editor-toolbar"
      :editor="editorRef"
      :mode="mode"
      :default-config="toolbarConfig"
    />
    <Editor
      style="height: 700px; overflow-y: hidden"
      v-model="modelValue"
      :mode="mode"
      :default-config="editorConfig"
      @on-created="onCreateEditor"
    />
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, computed, shallowRef, ref } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IDomEditor, IToolbarConfig, IEditorConfig } from '@wangeditor/editor'
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from 'element-plus'

const modelValue = defineModel<string>({ required: true })

// 编辑器实例
const editorRef = shallowRef<IDomEditor>()
const mode = ref<'default' | 'simple'>('default')
const userStore = useUserStore()

// 图片上传配置
const uploadHeaders = computed(() => ({
  Authorization: userStore.token || ''
}))

const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ['fontFamily']
}

const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      fieldName: 'file',
      maxFileSize: 3 * 1024 * 1024,
      maxNumberOfFiles: 10,
      allowedFileTypes: ['image/*'],
      server: `${import.meta.env.VITE_API_URL}/api/common/upload/wangeditor`,
      headers: uploadHeaders,
      onSuccess() {
        ElMessage.success(`图片上传成功`)
      },
      onError(file: File, err: any) {
        console.error('上传出错', err)
        ElMessage.error(`图片上传失败`)
      }
    }
  }
}

// 图标替换映射表
const iconMap: Record<string, string> = {
  bold: '',
  blockquote: '',
  underline: '',
  italic: '',
  'group-more-style': '',
  color: '',
  bgColor: '',
  bulletedList: '',
  numberedList: '',
  todo: '',
  'group-justify': '',
  'group-indent': '',
  emotion: '',
  insertLink: '',
  'group-image': '',
  insertTable: '',
  codeBlock: '',
  divider: '',
  undo: '',
  redo: '',
  fullScreen: '',
  tableFullWidth: ''
}

const onCreateEditor = (editor: IDomEditor) => {
  editorRef.value = editor
  setupIconObserver()
}

// MutationObserver 监听工具栏变化
const setupIconObserver = () => {
  const observer = new MutationObserver(() => {
    Object.entries(iconMap).forEach(([key, code]) => {
      const selector = `button[data-menu-key="${key}"]`
      const element = document.querySelector(selector)
      if (element && !element.innerHTML.includes('iconfont-sys')) {
        element.innerHTML = `<i class='iconfont-sys'>${code}</i>`
      }
    })
  })

  const toolbarElement = document.querySelector('.w-e-toolbar')
  if (toolbarElement) {
    observer.observe(toolbarElement, {
      childList: true,
      subtree: true
    })
  }
}

onBeforeUnmount(() => {
  if (editorRef.value) {
    editorRef.value.destroy()
  }
})
</script>

<style lang="scss" scoped>
.editor-wrapper {
  --editor-border-color: rgba(var(--art-gray-300-rgb), 0.8);
  --editor-active-bg: var(--art-gray-200);
  --editor-icon-size: 20px;

  z-index: 5000;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--editor-border-color);
  border-radius: calc(var(--custom-radius) / 2 + 2px);

  .iconfont-sys {
    font-size: var(--editor-icon-size) !important;
  }

  .w-e-bar-item {
    button {
      border-radius: 8px;
      transition: background-color 0.2s;

      &:hover {
        background-color: var(--editor-active-bg);
      }
    }
  }

  .editor-toolbar {
    border-bottom: 1px solid var(--art-border-color);
  }

  .w-e-text-container [data-slate-editor] {
    pre > code {
      padding: 0.6rem 1rem;
      background-color: var(--art-gray-100);
      border-radius: 6px;
    }

    blockquote {
      background-color: rgba(var(--art-gray-300-rgb), 0.25);
      border-left: 4px solid var(--art-gray-300);
    }
  }

  .w-e-modal,
  .w-e-drop-panel,
  .w-e-select-list {
    border: none !important;
    border-radius: 12px !important;
  }

  .w-e-select-list ul li {
    margin-top: 5px;
    font-size: 15px !important;
    border-radius: 10px;

    &:hover {
      background-color: var(--editor-active-bg);
    }

    &:last-of-type {
      font-size: 16px !important;
    }
  }

  .w-e-hover-bar {
    border-radius: 10px;
  }

  .w-e-image-dragger {
    width: 12px !important;
    height: 12px !important;
    background-color: #318ef4 !important;
    border: 2px solid #fff !important;
    border-radius: 12px !important;
  }
}

/* 覆盖默认变量 */
:root {
  --w-e-toolbar-active-bg-color: var(--editor-active-bg);
  --w-e-toolbar-color: var(--art-text-color-primary);
  --w-e-textarea-bg-color: var(--art-background-color);
  --w-e-textarea-color: var(--art-text-color-primary);
}
</style>
