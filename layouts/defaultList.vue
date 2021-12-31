<template>
  <div>
    <section class="main-content-top">
      <NavbarList v-on:componentRef="backPage" :title="title"/>
      <div @click="isClose" class="container_top">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import NavbarList from '~/components/NavbarList.vue'

export default {
  name: 'defaultList',
  data () {
    return {
      ref: '',
      title: ''
    }
  },
  components: {
    NavbarList
  },
  created () {
    this.setListener()
  },
  methods: {
    setListener () {
      this.$nuxt.$on('updateRef', this.setRef1)
      this.$nuxt.$on('updateTitle', this.setRef2)
    },
    setRef1 (ref) {
      this.ref = ref || ''
    },
    setRef2 (title) {
      this.title = title || ''
    },
    backPage () {
      this.$router.push(this.ref)
    },
    isClose () {
      this.$nuxt.$emit('isClose')
    }
  }
}
</script>

<style>
.main-content-top {
  height: 100vh;
  background: #eff6f6;
}

.container-top {
  height: calc(100% - 58px);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (min-width: 769px) {
  .container_top {
    height: calc(100% - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
