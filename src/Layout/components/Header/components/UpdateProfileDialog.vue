<template>
  <el-dialog v-model="visible" title="修改资料" width="500px" destroy-on-close>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" label-suffix=" :">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleAvatarChange"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="form.name" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, type FormInstance, type UploadFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { updateUserProfile } from '@/api/modules/system'
import { useUserStore } from '@/store/modules/user'

const visible = ref(false)
const loading = ref(false)
const formRef = ref<FormInstance>()
const userStore = useUserStore()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  remark: ''
})

const imageUrl = ref('')
const avatarFile = ref<File | null>(null)

const rules = {
  name: [{ required: true, message: '请输入昵称', trigger: 'blur' }]
}

const open = () => {
  const { name, email, phone, remark, avatar } = userStore.userInfo
  form.name = name || ''
  form.email = email || ''
  form.phone = phone || ''
  form.remark = remark || ''
  imageUrl.value = avatar || ''
  avatarFile.value = null
  visible.value = true
}

const handleAvatarChange = (uploadFile: UploadFile) => {
  if (uploadFile.raw) {
    imageUrl.value = URL.createObjectURL(uploadFile.raw)
    avatarFile.value = uploadFile.raw
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true
        const formData = new FormData()
        formData.append('name', form.name)
        formData.append('email', form.email)
        formData.append('phone', form.phone)
        formData.append('remark', form.remark)
        if (avatarFile.value) {
          formData.append('avatar', avatarFile.value)
        }

        const res = await updateUserProfile(formData)

        userStore.setUserInfo({
          ...userStore.userInfo,
          name: form.name,
          email: form.email,
          phone: form.phone,
          remark: form.remark,
          ...(res.data?.avatar && { avatar: res.data.avatar })
        })

        ElMessage.success('修改成功')
        visible.value = false
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    }
  })
}

defineExpose({ open })
</script>

<style scoped>
.avatar-uploader .avatar {
  display: block;
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>

<style>
.avatar-uploader .el-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  width: 100px;
  height: 100px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
