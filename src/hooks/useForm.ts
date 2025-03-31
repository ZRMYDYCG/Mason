import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

type SubmitFunction<T extends object> = (values: T) => Promise<void> | void

interface UseFormOptions<T extends object> {
  /** 初始表单值 */
  initialValues: T
  /** 验证规则 */

  rules?: FormRules<T>
  /** 提交函数 */
  onSubmit?: SubmitFunction<T>
  /** 提交防抖时间（毫秒） */
  debounce?: number
}

export function useForm<T extends object>(options: UseFormOptions<T>) {
  const formRef = ref<FormInstance>()
  const loading = ref(false)
  const errorMessage = ref<string>()
  const lastSubmitTime = ref(0)

  // 响应式表单模型（使用初始值的深拷贝）
  const formModel = reactive<T>({ ...options.initialValues })

  // 默认防抖时间300ms
  const debounceTime = options.debounce ?? 300

  /**
   * 执行表单验证
   * @returns 是否验证通过
   */
  const validate = async () => {
    if (!formRef.value) {
      console.warn('表单实例未绑定')
      return false
    }
    try {
      await formRef.value.validate()
      errorMessage.value = undefined
      return true
    } catch (errors) {
      errorMessage.value = '请正确填写表单内容'
      // 你可以在这里处理更详细的错误信息
      return false
    }
  }

  /** 重置表单到初始值 */
  const resetFields = () => {
    formRef.value?.resetFields()
    Object.assign(formModel, options.initialValues)
    errorMessage.value = undefined
  }

  /**
   * 提交处理（带防抖）
   */
  const handleSubmit = async () => {
    // 防抖检查
    const now = Date.now()
    if (now - lastSubmitTime.value < debounceTime) return
    lastSubmitTime.value = now

    // 验证表单
    const isValid = await validate()
    if (!isValid || !options.onSubmit) return

    // 执行提交
    try {
      loading.value = true
      await options.onSubmit(formModel as any)
      errorMessage.value = undefined
    } catch (err) {
      errorMessage.value = (err as Error).message || '提交失败，请稍后重试'
    } finally {
      loading.value = false
    }
  }

  // 暴露给模板的属性和方法
  return {
    /** Element Plus表单实例引用（需要绑定到el-form的ref属性） */
    formRef,
    /** 表单数据模型（需要绑定到el-form的model属性） */
    formModel,
    /** 加载状态 */
    loading,
    /** 错误信息 */
    errorMessage,
    /** 表单验证方法 */
    validate,
    /** 重置表单方法 */
    resetFields,
    /** 提交处理方法 */
    handleSubmit,
    /** 表单绑定props（方便直接v-bind="formProps"） */
    formProps: {
      model: formModel,
      rules: options.rules
    } as {
      model: T
      rules?: FormRules<T>
    }
  }
}
