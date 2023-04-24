<script setup lang="ts">
import { IconUser, IconLock, IconMessage, IconMobile } from '@arco-design/web-vue/es/icon'

const emits = defineEmits(['backLogin'])

function backLogin() {
  emits('backLogin')
}
</script>

<template>
  <a-form auto-label-width size="large">
    <a-form-item>
      <a-input placeholder="请输入账号">
        <template #prefix>
          <IconUser />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input placeholder="请输入手机号">
        <template #prefix>
          <IconMobile />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <div class="w-full flex flex-row items-center justify-between">
        <a-input placeholder="请输入验证码">
          <template #prefix>
            <IconMessage />
          </template>
        </a-input>
        <a-button class="ml-2" type="outline">获取验证码</a-button>
      </div>
    </a-form-item>
    <a-form-item>
      <a-input-password placeholder="请输入新密码">
        <template #prefix>
          <IconLock />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-input-password placeholder="确认密码">
        <template #prefix>
          <IconLock />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" long>保存</a-button>
    </a-form-item>
    <a-form-item>
      <div class="w-full text-right">
        <span class="hover:cursor-pointer hover:opacity-70" @click="backLogin">返回登录</span>
      </div>
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped></style>
