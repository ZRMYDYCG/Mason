import { CSSProperties } from 'vue'

export interface InputNumberAttrs {
  style?: CSSProperties
  min?: number
  max?: number
  step?: number
  stepStrictly?: boolean
  precision?: number
  size?: 'large' | 'medium' | 'small'
  disabled?: boolean
  controls?: boolean
  controlsPosition?: '' | 'right'
  placeholder?: string
}
