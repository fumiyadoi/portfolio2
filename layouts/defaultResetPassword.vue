<template>
  <div>
    <section class="main-content">
      <NavbarResetPassword />
      <div class="container">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import NavbarResetPassword from '~/components/NavbarResetPassword.vue'

export default {
  components: {
    NavbarResetPassword
  }
}
</script>

<style>
.main-content {
  background: #eff6f6;
  height: 100vh;
}
</style>
