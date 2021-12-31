<template>
  <div>
    <section class="main-content">
      <NavbarSignin />
      <div class="container">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import NavbarSignin from '~/components/NavbarSignin.vue'

export default {
  components: {
    NavbarSignin
  }
}
</script>

<style>
.main-content {
  background: #eff6f6;
  height: 100vh;
}
</style>
