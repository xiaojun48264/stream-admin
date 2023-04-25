<script setup lang="ts">
import LoginForm from './login-form.vue'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'
import { ref } from 'vue'

const ResetPassword = createAsyncComponent(() => import('./reset-password.vue'))

const showResetPassword = ref(false)
</script>

<template>
  <div class="stream-login">
    <div class="container">
      <div class="stream-login-logo">Stream Admin</div>
      <div class="stream-login-form">
        <transition name="fade-slide" mode="out-in">
          <login-form v-if="!showResetPassword" @reset-password="showResetPassword = true" />
          <reset-password v-else @back-login="showResetPassword = false" />
        </transition>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@keyframes backInDown {
  0% {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
    transform-origin: center bottom;
  }
  80% {
    transform: translate3d(0, 10px, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@media (max-width: theme('screens.md')) {
  .stream-login {
    background: #fff !important;
    .container {
      @apply border border-solid shadow-md rounded;
    }
  }
}
@media (min-width: theme('screens.md')) {
  .arco-input {
    &-wrapper {
      background-color: var(--color-bg-2);
      border-color: var(--color-fill-2);
      &:hover {
        background-color: var(--color-bg-3);
      }
    }
    &-prefix {
      color: rgb(var(--primary-6)) !important;
    }
  }
}
.stream-login {
  width: 100%;
  height: 100%;
  background: url('@/assets/image/login-bg.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  padding: 120px 0;
  .container {
    width: 400px;
    margin: 0 auto;
    padding: 16px;
    animation: backInDown 1s ease;
    animation-fill-mode: both;
  }
  &-logo {
    font-size: 40px;
    font-weight: 700;
    text-align: center;
    letter-spacing: 2px;
    color: rgba(1, 61, 139, 1);
    margin-bottom: 20px;
  }
  &-form {
    .arco-tabs-nav::before {
      background-color: transparent;
    }
  }
}
</style>
