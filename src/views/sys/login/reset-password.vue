<script setup lang="ts">
import { IconUser, IconLock, IconMessage, IconMobile } from '@arco-design/web-vue/es/icon'
import { ref } from 'vue'

const emits = defineEmits(['backLogin'])

const userInfo = ref({
  user_name: '',
  phone: '',
  sms_code: '',
  password: '',
  confirm_password: '',
})

const rules = {
  user_name: [{ required: true, message: '请输入账号' }],
  phone: [{ required: true, message: '请输入手机号' }],
  sms_code: [{ required: true, message: '请输入验证码' }],
  password: [{ required: true, message: '请输入新密码' }],
  confirm_password: [{ required: true, message: '请确认密码' }],
}

const formRef = ref()

function saveUserInfo() {
  formRef.value?.validate()
}

function backLogin() {
  emits('backLogin')
}
</script>

<template>
  <a-form ref="formRef" :model="userInfo" :rules="rules" auto-label-width size="large">
    <a-form-item field="user_name" hide-asterisk>
      <a-input v-model="userInfo.user_name" placeholder="请输入账号">
        <template #prefix>
          <IconUser />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item field="phone" hide-asterisk>
      <a-input v-model="userInfo.phone" placeholder="请输入手机号">
        <template #prefix>
          <IconMobile />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item field="sms_code" hide-asterisk>
      <div class="w-full flex flex-row items-center justify-between">
        <a-input v-model="userInfo.sms_code" placeholder="请输入验证码">
          <template #prefix>
            <IconMessage />
          </template>
        </a-input>
        <a-button class="ml-2" type="outline">获取验证码</a-button>
      </div>
    </a-form-item>
    <a-form-item field="password" hide-asterisk>
      <a-input-password v-model="userInfo.password" placeholder="请输入新密码">
        <template #prefix>
          <IconLock />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item field="confirm_password" hide-asterisk>
      <a-input-password v-model="userInfo.confirm_password" placeholder="确认密码">
        <template #prefix>
          <IconLock />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" long @click="saveUserInfo">保存</a-button>
    </a-form-item>
    <a-form-item>
      <div class="w-full text-right">
        <span class="hover:cursor-pointer hover:opacity-70" @click="backLogin">返回登录</span>
      </div>
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped></style>
