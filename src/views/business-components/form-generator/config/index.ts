import { ComponentItem } from '../types'

export const components: ComponentItem[] = [
  {
    type: 'input',
    label: '输入框',
    icon: 'shurukuang',
    value: '',
    field: 'inputValue',
    labelWidth: 90,
    showLabel: true,
    suffix: '',
    prefix: '',
    rules: [],
    defaultProps: {
      type: 'text',
      maxlength: '',
      showWordLimit: false,
      showPassword: false,
      disabled: false,
      readonly: false,
      size: '',
      prefixIcon: '',
      suffixIcon: '',
      rows: 2,
      autosize: false,
      resize: 'none'
    },
    attrs: {
      type: 'text',
      maxlength: '',
      showWordLimit: false,
      placeholder: '请输入',
      clearable: true,
      showPassword: false,
      disabled: false,
      readonly: false,
      size: '',
      prefixIcon: '',
      suffixIcon: '',
      rows: 2,
      autosize: false,
      resize: 'none'
    }
  },
  {
    type: 'button',
    label: '按钮',
    icon: 'ananniu',
    showLabel: true,
    labelWidth: 90,
    rules: [],
    field: 'button',
    defaultProps: {
      text: false,
      plain: false,
      round: false,
      circle: false,
      loading: false,
      disabled: false,
      autofocus: false,
      autoInsertSpace: false,
      icon: '',
      nativeType: 'button'
    },
    attrs: {
      text: false,
      buttonText: '按钮',
      size: '',
      type: 'primary',
      plain: false,
      round: false,
      circle: false,
      loading: false,
      disabled: false,
      autofocus: false,
      autoInsertSpace: false,
      icon: '',
      nativeType: 'button'
    }
  },
  {
    type: 'input-number',
    icon: 'jishuqi',
    label: '计数器',
    value: 0,
    field: 'inputNumber',
    showLabel: true,
    labelWidth: 90,
    rules: [],
    defaultProps: {
      step: 1,
      stepStrictly: false,
      precision: 0,
      size: 'large',
      disabled: false,
      controls: true,
      controlsPosition: ''
    },
    attrs: {
      min: 0,
      max: 100,
      step: 1,
      stepStrictly: false,
      precision: 0,
      size: 'large',
      disabled: false,
      controls: true,
      controlsPosition: '',
      placeholder: '请输入金额'
    }
  },
  {
    type: 'switch',
    label: '开关',
    icon: 'kaiguan',
    value: '',
    field: 'switch',
    showLabel: true,
    labelWidth: 90,
    rules: [],
    defaultProps: {
      disabled: false,
      loading: false,
      width: 40,
      activeIcon: '',
      inactiveIcon: '',
      activeText: '',
      inactiveText: '',
      activeValue: true,
      inactiveValue: false,
      activeColor: '#409EFF',
      inactiveColor: '#C0CCDA',
      borderColor: ''
    },
    attrs: {
      disabled: false,
      loading: false,
      width: 40,
      activeIcon: '',
      inactiveIcon: '',
      activeText: '',
      inactiveText: '',
      activeValue: true,
      inactiveValue: false,
      activeColor: '#409EFF',
      inactiveColor: '#C0CCDA',
      borderColor: ''
    }
  },
  {
    type: 'rate',
    label: '评分',
    icon: 'pingfen',
    showLabel: true,
    labelWidth: 90,
    value: 3,
    field: 'star',
    rules: [],
    defaultProps: {
      max: 5,
      disabled: false,
      allowHalf: false,
      voidColor: '#C6D1DE',
      disabledVoidColor: '#EFF2F7',
      disabledVoidIcon: '',
      showText: true,
      showScore: true,
      textColor: ''
    },
    attrs: {
      max: 5,
      disabled: false,
      allowHalf: false,
      voidColor: '#C6D1DE',
      disabledVoidColor: '#EFF2F7',
      disabledVoidIcon: '',
      showText: true,
      showScore: true,
      textColor: ''
    }
  },
  {
    type: 'color-picker',
    icon: 'a-huabuquseqi2',
    label: '取色器',
    value: '',
    field: 'color',
    rules: [],
    showLabel: true,
    labelWidth: 90,
    defaultProps: {
      disabled: false,
      showAlpha: false,
      size: '',
      colorFormat: 'rgb'
    },
    attrs: {
      disabled: false,
      showAlpha: false,
      size: '',
      colorFormat: 'rgb'
    }
  },
  {
    type: 'slider',
    icon: 'slider',
    label: '滑块',
    value: 0,
    field: 'slider',
    showLabel: true,
    labelWidth: 90,
    rules: [],
    defaultProps: {
      step: 1,
      disabled: false,
      showInput: false,
      showInputControls: true,
      inputSize: 'small',
      showStops: false,
      showTooltip: true,
      range: false,
      vertical: false
    },
    attrs: {
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
      showInput: false,
      showInputControls: true,
      inputSize: 'small',
      showStops: false,
      showTooltip: true,
      range: false,
      vertical: false,
      height: '300',
      heightValue: 300
    }
  },
  {
    type: 'radio-group',
    icon: 'danxuankuang',
    label: '单选框',
    value: '1',
    field: 'radio',
    showLabel: true,
    labelWidth: 90,
    rules: [],
    defaultProps: {
      textColor: '#ffffff',
      fill: '#409EFF',
      disabled: false,
      size: 'default'
    },
    attrs: {
      textColor: '#ffffff',
      fill: '#409EFF',
      disabled: false,
      size: 'default'
    },
    children: [
      {
        type: 'radio',
        defaultProps: {
          disabled: false,
          border: false
        },
        attrs: {
          label: '1',
          text: '选项1',
          disabled: false,
          border: false,
          size: ''
        }
      },
      {
        type: 'radio',
        defaultProps: {
          text: '选项1'
        },
        attrs: {
          text: '选项2',
          label: '2',
          disabled: false,
          border: false,
          size: ''
        }
      }
    ]
  },
  {
    type: 'checkbox-group',
    icon: 'fuxuankuangduoge',
    label: '复选框',
    value: ['1'],
    field: 'checkbox',
    showLabel: true,
    labelWidth: 90,
    rules: [],
    defaultProps: {
      textColor: '#ffffff',
      fill: '#409EFF',
      disabled: false,
      size: 'default'
    },
    attrs: {
      textColor: '#ffffff',
      fill: '#409EFF',
      disabled: false,
      size: 'default'
    },
    children: [
      {
        type: 'checkbox',
        defaultProps: {
          disabled: false,
          border: false,
          size: ''
        },
        attrs: {
          label: '1',
          text: '选项1',
          disabled: false,
          border: false,
          size: ''
        }
      },
      {
        type: 'checkbox',
        defaultProps: {
          disabled: false,
          border: false,
          size: ''
        },
        attrs: {
          text: '选项2',
          label: '2',
          disabled: false,
          border: false,
          size: ''
        }
      },
      {
        type: 'checkbox',
        defaultProps: {
          disabled: false,
          border: false,
          size: ''
        },
        attrs: {
          text: '选项3',
          label: '3',
          disabled: false,
          border: false,
          size: ''
        }
      }
    ]
  },
  {
    type: 'select',
    icon: 'xialakuang',
    label: '下拉框',
    value: '',
    field: 'select',
    showLabel: true,
    labelWidth: 90,
    rules: [],
    defaultProps: {
      multiple: false,
      disabled: false,
      clearable: false,
      collapseTags: false,
      collapseTagsTooltip: false,
      valueKey: '',
      size: 'default',
      multipleLimit: 0,
      filterable: false,
      remote: false,
      loading: false
    },
    attrs: {
      multiple: false,
      disabled: false,
      clearable: false,
      collapseTags: false,
      collapseTagsTooltip: false,
      valueKey: '',
      size: 'default',
      multipleLimit: 0,
      placeholder: '请选择',
      filterable: false,
      remote: false,
      loading: false
      // filterMethod: (val: '') => {},
      // remoteMethod: (val: '') => {}
    },
    children: [
      {
        type: 'option',
        defaultProps: {
          disabled: false
        },
        attrs: {
          label: '选项1',
          value: '1',
          disabled: false
        }
      },
      {
        type: 'option',
        defaultProps: {
          disabled: false
        },
        attrs: {
          label: '选项2',
          value: '2',
          disabled: false
        }
      }
    ]
  },
  {
    type: 'cascader',
    icon: 'jilianxuanze',
    label: '级联选择',
    value: '',
    field: 'cascader',
    showLabel: true,
    labelWidth: 90,
    rules: [],
    defaultProps: {
      size: 'default',
      placeholder: '请选择',
      disabled: false,
      clearable: false,
      filterable: false,
      showAllLevels: false,
      separator: '/',
      props: {
        expandTrigger: 'click',
        multiple: false,
        value: 'value',
        label: 'label',
        children: 'children',
        disabled: 'disabled',
        leaf: 'leaf'
      }
    },
    attrs: {
      size: 'default',
      placeholder: '请选择',
      disabled: false,
      clearable: false,
      filterable: false,
      showAllLevels: false,
      separator: '/',
      props: {
        expandTrigger: 'click',
        multiple: false,
        value: 'value',
        label: 'label',
        children: 'children',
        disabled: 'disabled',
        leaf: 'leaf'
      }
    },
    children: [
      {
        value: '1',
        label: '选项1',
        children: [
          {
            value: '1-1',
            label: '选项1-1'
          }
        ]
      },
      { value: '2', label: '选项2' }
    ]
  },
  {
    type: 'time-picker',
    icon: 'shijianxuanzeqi',
    label: '时间选择器',
    value: '',
    field: 'timePicker',
    showLabel: true,
    labelWidth: 90,
    rules: [],
    defaultProps: {
      format: 'HH:mm:ss',
      readonly: false,
      disabled: false,
      editable: false,
      clearable: false,
      arrowControl: false,
      size: 'default',
      isRange: false,
      rangeSeparator: '-',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间'
    },
    attrs: {
      format: 'HH:mm:ss',
      readonly: false,
      disabled: false,
      editable: false,
      clearable: false,
      arrowControl: false,
      size: 'default',
      placeholder: '请选择',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      isRange: false,
      rangeSeparator: '-'
    }
  },
  {
    type: 'date-picker',
    icon: 'riqixuanzeqi',
    label: '日期选择器',
    value: '',
    field: 'timePicker',
    showLabel: true,
    labelWidth: 90,
    rules: [],
    defaultProps: {
      format: 'YYYY-MM-DD',
      readonly: false,
      disabled: false,
      editable: false,
      clearable: false,
      size: 'default',
      placeholder: '请选择',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      rangeSeparator: '-',
      type: 'date'
    },
    attrs: {
      format: 'YYYY-MM-DD',
      readonly: false,
      disabled: false,
      editable: false,
      clearable: false,
      size: 'default',
      placeholder: '请选择',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      rangeSeparator: '-',
      type: 'date'
    }
  },
  {
    type: 'time-select',
    icon: 'shijianxuanzeqi1',
    label: '时间选择',
    value: '',
    field: 'timeSelect',
    showLabel: true,
    labelWidth: 90,
    rules: [],
    defaultProps: {
      readonly: false,
      disabled: false,
      editable: false,
      clearable: false,
      size: 'default'
    },
    attrs: {
      readonly: false,
      disabled: false,
      editable: false,
      clearable: false,
      size: 'default',
      placeholder: '请选择',
      start: '09:00',
      end: '22:00',
      step: '00:30',
      minTime: '00:00',
      maxTime: ''
    }
  }
]
