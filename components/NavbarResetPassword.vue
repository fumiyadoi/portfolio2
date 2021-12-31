<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="columns is-mobile  is-vcentered" style="margin: 0; height: 100%;">
      <div class="column is-2 has-text-right-tablet" style="display: flex; align-items: center;">
        <LeftArrow @click="checkBack" class="leftarrow" style="width: 44px; height: 44px;" />
      </div>
      <div class="column is-2"></div>
      <div class="column is-4 has-text-white has-text-centered">パスワード再設定</div>
      <div class="column is-4"></div>
    </div>
  </nav>
</template>

<script>
import Sublogo from '~/assets/sublogo.svg'
import LeftArrow from '~/assets/Accessory_Left_Arrow.svg'

export default {
  components: {
    Sublogo,
    LeftArrow
  },
  methods: {
    checkBack () {
      this.$router.push('userlist')
    }
  }
}
</script>

<style>
/* 共通 */
.navbar {
  background: #3362a8;
}

/* タブレット・PC */
@media screen and (min-width: 768px) {
  .navbar {
    height: 80px;
  }

  .sublogo {
    width: 74px;
    height: 44px;
  }
}

/* スマホ */
@media screen and (max-width: 768px) {
  .navbar {
    height: 58px;
  }

  .sublogo {
    width: 60px;
    height: 36px;
  }
}
</style>
