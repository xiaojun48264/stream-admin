<script setup lang="ts">
import { ref } from 'vue'
import {
  IconUser,
  IconLock,
  IconSafe,
  IconQuestionCircleFill,
  IconMobile,
  IconMessage,
} from '@arco-design/web-vue/es/icon'
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'

const emits = defineEmits(['resetPassword'])

const router = useRouter()
const userStore = useUserStore()

// 当前选中的tab
const activeTab = ref('account')

// 登录信息
const loginInfo = ref({
  user_name: '',
  password: '',
  phone: '',
  sms_code: '',
  captcha: '',
})

// 校验规则
const rules = {
  user_name: [{ required: true, message: '请输入账户名/手机号/邮箱' }],
  password: [{ required: true, message: '请输入密码' }],
  phone: [{ required: true, message: '请输入手机号' }],
  sms_code: [{ required: true, message: '请输入验证码' }],
  captcha: [{ required: true, message: '请输入图形码' }],
}

// 表单实例
const formRef = ref()

// 登录
async function login() {
  await formRef.value?.validate()
  await userStore.login()
  router.push('/')
}

// 重置密码
function resetPassword() {
  emits('resetPassword')
}
</script>

<template>
  <a-tabs v-model:active-key="activeTab" lazy-load animation>
    <a-tab-pane key="account" title="账户密码登录">
      <a-form
        v-if="activeTab === 'account'"
        ref="formRef"
        :model="loginInfo"
        :rules="rules"
        size="large"
        auto-label-width
      >
        <a-form-item field="user_name" hide-asterisk>
          <a-input v-model="loginInfo.user_name" placeholder="账户名/手机号/邮箱">
            <template #prefix>
              <IconUser />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="password" hide-asterisk>
          <a-input-password v-model="loginInfo.password" placeholder="密码">
            <template #prefix>
              <IconLock />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item field="captcha" hide-asterisk>
          <div>
            <a-input v-model="loginInfo.captcha" placeholder="图形码">
              <template #prefix>
                <IconSafe />
              </template>
            </a-input>
          </div>
        </a-form-item>
        <a-form-item>
          <div class="flex flex-row items-center justify-between w-full">
            <a-checkbox>记住密码</a-checkbox>
            <span class="hover:cursor-pointer hover:opacity-70" @click="resetPassword">
              忘记密码
              <IconQuestionCircleFill />
            </span>
          </div>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" long @click="login">登录</a-button>
        </a-form-item>
      </a-form>
    </a-tab-pane>
    <a-tab-pane key="phone" title="手机号登录">
      <a-form
        v-if="activeTab === 'phone'"
        ref="formRef"
        :model="loginInfo"
        :rules="rules"
        size="large"
        auto-label-width
      >
        <a-form-item field="phone" hide-asterisk>
          <a-input v-model="loginInfo.phone" placeholder="手机号">
            <template #prefix>
              <IconMobile />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="sms_code" hide-asterisk>
          <div class="w-full flex flex-row items-center justify-between">
            <a-input v-model="loginInfo.sms_code" placeholder="验证码">
              <template #prefix>
                <IconMessage />
              </template>
            </a-input>
            <a-button class="ml-2" type="outline">获取验证码</a-button>
          </div>
        </a-form-item>
        <a-form-item field="captcha" hide-asterisk>
          <div>
            <a-input v-model="loginInfo.captcha" placeholder="图形码">
              <template #prefix>
                <IconSafe />
              </template>
            </a-input>
          </div>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" long @click="login">登录</a-button>
        </a-form-item>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>
