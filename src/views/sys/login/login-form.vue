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

// 当前选中的tab
const activeTab = ref('account')

// 登录信息
const loginInfo = ref({
  username: '',
  password: '',
})
</script>

<template>
  <a-tabs v-model="activeTab" lazy-load animation>
    <a-tab-pane key="account" title="账户密码登录">
      <a-form :model="loginInfo" auto-label-width>
        <a-form-item>
          <a-input v-model="loginInfo.username" placeholder="账户名/手机号/邮箱">
            <template #prefix>
              <IconUser />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password v-model="loginInfo.password" placeholder="密码">
            <template #prefix>
              <IconLock />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <div>
            <a-input placeholder="图形码">
              <template #prefix>
                <IconSafe />
              </template>
            </a-input>
          </div>
        </a-form-item>
        <a-form-item>
          <div class="flex flex-row items-center justify-between w-full">
            <a-checkbox>记住密码</a-checkbox>
            <span class="hover:cursor-pointer">
              忘记密码
              <IconQuestionCircleFill />
            </span>
          </div>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" long>登录</a-button>
        </a-form-item>
      </a-form>
    </a-tab-pane>
    <a-tab-pane key="phone" title="手机号登录">
      <a-form :model="loginInfo" auto-label-width>
        <a-form-item>
          <a-input placeholder="手机号">
            <template #prefix>
              <IconMobile />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <div class="w-full flex flex-row items-center justify-between">
            <a-input placeholder="验证码">
              <template #prefix>
                <IconMessage />
              </template>
            </a-input>
            <a-button class="ml-2" type="outline">获取验证码</a-button>
          </div>
        </a-form-item>
        <a-form-item>
          <div>
            <a-input placeholder="图形码">
              <template #prefix>
                <IconSafe />
              </template>
            </a-input>
          </div>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" long>登录</a-button>
        </a-form-item>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>
