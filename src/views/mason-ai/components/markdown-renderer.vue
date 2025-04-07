<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/scss/default.scss'
import 'highlight.js/styles/vs2015.css'

const props = defineProps<{
  content: string
}>()

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const result = hljs.highlight(str, {
          language: lang,
          ignoreIllegals: true
        })
        const lines = result.value.split(/\n/).slice(0, -1)
        let html = lines
          .map((item, index) => {
            return `<li><span class="line-number">${index + 1}</span><div class="code-line">${item || ' '}</div></li>`
          })
          .join('')
        return `<pre class="hljs"><code><ol>${html}</ol>${
          lines.length ? `<span class="language-label">${lang}</span>` : ''
        }</code></pre>`
      } catch (e) {
        console.error('Error highlighting code:', e)
      }
    }

    // 未指定语言时的处理
    const preCode = md.utils.escapeHtml(str)
    const lines = preCode.split(/\n/).slice(0, -1)
    let html = lines
      .map((item, index) => {
        return `<li><span class="line-number">${index + 1}</span><div class="code-line">${item || ' '}</div></li>`
      })
      .join('')
    return `<pre class="hljs"><code><ol>${html}</ol></code></pre>`
  }
})

const htmlContent = ref('')

watchEffect(() => {
  console.log('content changed', props.content)
  htmlContent.value = md.render(props.content)
})
</script>

<template>
  <div class="markdown-body" v-html="htmlContent"></div>
</template>

<style scoped lang="scss">
.markdown-body {
  :deep(pre.hljs) {
    position: relative;
    padding: 12px 0;
    background: #1e1e1e;
    border-radius: 8px;
    overflow-x: auto;

    code {
      display: block;
      padding: 0 16px;

      ol {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
          display: flex;
          min-height: 1.2em;
          line-height: 1.5;
          font-family: Consolas, Monaco, 'Andale Mono', monospace;

          &:hover {
            background: rgba(255, 255, 255, 0.05);
          }

          .line-number {
            display: inline-block;
            width: 40px;
            padding-right: 12px;
            color: #858585;
            text-align: right;
            user-select: none;
            flex-shrink: 0;
          }

          .code-line {
            flex-grow: 1;
            white-space: pre;
          }
        }
      }

      .language-label {
        position: absolute;
        top: 0;
        right: 0;
        padding: 2px 8px;
        background: #3a3a3a;
        color: #ccc;
        font-size: 0.75rem;
        border-radius: 0 8px 0 4px;
        font-family: sans-serif;
      }
    }
  }
}
</style>
