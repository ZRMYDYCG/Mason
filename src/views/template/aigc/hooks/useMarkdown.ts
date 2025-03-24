import { ref } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

interface MarkdownOptions {
  html?: boolean
  linkify?: boolean
  typographer?: boolean
  highlight?: (str: string, lang: string) => string
}

export default function useMarkdown(options: MarkdownOptions = {}) {
  const md = ref<MarkdownIt>(
    new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: (str: any, lang: any) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value
          } catch (__) {}
        }
        return ''
      },
      ...options
    })
  )

  const renderMarkdown = (content: string): string => {
    return md.value.render(content)
  }

  return {
    renderMarkdown
  }
}
