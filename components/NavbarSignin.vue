<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="columns is-mobile  is-vcentered" style="margin: 0; height: 100%;">
      <div class="column is-4"></div>
      <div class="column is-4 has-text-centered">
        <Sublogo class="sublogo" />
      </div>
      <div class="column is-4"></div>
    </div>
  </nav>
</template>

<script>
import Sublogo from '~/assets/sublogo.svg'

export default {
  components: {
    Sublogo
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
