import { CSSProperties } from 'vue'

export interface SliderAttrs {
  style?: CSSProperties
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  showInput?: boolean
  showInputControls?: boolean
  inputSize?: 'large' | 'medium' | 'small'
  showStops?: boolean
  showTooltip?: boolean
  range?: boolean
  vertical?: boolean
  height?: string
  heightValue?: number
}
