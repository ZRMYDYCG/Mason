export type SizeProps = '' | 'large' | 'small' | 'default'
export type TypeProps = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
import type { RuleItem } from './rule.ts'
import type {
  ButtonAttrs,
  CascaderAttrs,
  CheckboxAttrs,
  ColorPickerAttrs,
  DatePickerAttrs,
  InputAttrs,
  InputNumberAttrs,
  RadioAttrs,
  RateAttrs,
  SelectAttrs,
  SliderAttrs,
  TimePickerAttrs,
  SwitchAttrs,
  TimeSelectAttrs
} from './attrs'

export interface ComponentItem {
  type?:
    | 'button'
    | 'cascader'
    | 'checkbox'
    | 'checkbox-group'
    | 'checkbox-button'
    | 'color-picker'
    | 'date-picker'
    | 'input'
    | 'input-number'
    | 'radio'
    | 'radio-group'
    | 'radio-button'
    | 'rate'
    | 'select'
    | 'option'
    | 'slider'
    | 'switch'
    | 'time-picker'
    | 'time-select'
    | 'transfer'
    | 'upload'
    | 'editor'
  label?: string
  icon?: string
  value?: any
  field?: string
  showLabel?: boolean
  labelWidth?: number | string
  rules?: RuleItem[]
  suffix?: string
  prefix?: string
  children?: ComponentItem[]
  defaultProps?: {
    [key: string]: any
  }
  attrs?:
    | ButtonAttrs
    | CascaderAttrs
    | CheckboxAttrs
    | ColorPickerAttrs
    | DatePickerAttrs
    | InputAttrs
    | InputNumberAttrs
    | RadioAttrs
    | RateAttrs
    | SelectAttrs
    | SliderAttrs
    | SwitchAttrs
    | TimePickerAttrs
    | TimeSelectAttrs
}
