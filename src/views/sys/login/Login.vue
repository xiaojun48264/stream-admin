<script setup lang="ts">
import loginForm from './login-form.vue'
</script>

<template>
  <div class="stream-login">
    <div class="container">
      <div class="stream-login-logo">Stream Admin</div>
      <div class="stream-login-form">
        <login-form />
      </div>
    </div>
  </div>
</template>

<style lang="less">
.stream-login {
  width: 100%;
  height: 100%;
  background: url('@/assets/image/login-bg.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  .container {
    width: 400px;
    margin: 0 auto;
    margin-top: 10%;
    padding: 16px;
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
</style>
