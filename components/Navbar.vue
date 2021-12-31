<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="columns is-mobile  is-vcentered" style="margin: 0; height: 100%;">
      <div class="column is-4"></div>
      <div class="column is-4 has-text-centered">
        <Sublogo class="sublogo" />
      </div>
      <template v-if="isLogin">
        <div class="column is-3 is-hidden-touch has-text-white has-text-right is-size-7" style="word-wrap: break-word;">{{ eMail }}</div>
        <!-- <div class="column is-1 is-hidden-touch has-text-white has-text-centered is-size-7"><span @click="goSetting">設定</span></div> -->
        <div class="column is-1 is-hidden-touch has-text-white has-text-centered is-size-7"><span @click="logout">ログアウト</span></div>
        <a role="button" class="navbar-burger is-hidden-desktop has-text-white" aria-label="menu" aria-expanded="false" @click="changeBurgerVisibillity" v-bind:class="{ 'is-active': burgerVisibillity }">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </template>
      <template v-else>
        <div class="column is-5 has-text-white has-text-right is-size-7"><span @click="logout">ログイン</span></div>
      </template>
    </div>
    <div class="navbar-menu is-hidden-desktop" v-bind:class="{ 'is-active': burgerVisibillity }">
      <div class="navbar-item" style="cursor: default;">{{ eMail }}</div>
      <!-- <a class="navbar-item" @click="goSetting">設定</a> -->
      <a class="navbar-item" @click="logout">ログアウト</a>
    </div>
  </nav>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import Sublogo from '~/assets/sublogo.svg'

export default {
  data () {
    return {
      eMail: '',
      isLogin: false,
      burgerVisibillity: false
    }
  },
  components: {
    Sublogo
  },
  created () {
    this.setListener()
    if (this.$router.history.current.name === 'signin') {
      this.isNotSigninPage = false
    }
  },
  async mounted () {
    const auth = await getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.commit('data/setUserId', user.uid)
        this.$store.commit('data/setEmail', user.email)
        this.eMail = this.$store.state.data.email
        this.isLogin = true
        console.log('ログインしている' + user.email)
      } else {
        if (!this.$store.state.data.stopRedirect) {
          // ログインしていない場合はリダイレクトします
          this.$router.push('signin')
          console.log('リダイレクトします')
          this.$store.commit('data/setUserId', '')
          this.$store.commit('data/setEmail', '')
          this.isLogin = false
        }
      }
    })
  },
  methods: {
    setListener () {
      this.$nuxt.$on('isClose', this.isClose)
    },
    isClose () {
      if (this.burgerVisibillity) {
        this.changeBurgerVisibillity()
      }
    },
    changeBurgerVisibillity () {
      this.burgerVisibillity = !this.burgerVisibillity
    },
    goSetting () {
      this.$router.push('setting')
    },
    async logout () {
      this.isClose()
      const auth = await getAuth()
      signOut(auth).then(() => {
        // Sign-out successful.
        this.$router.push('signin')
        this.$store.commit('data/setUserId', '')
        this.$store.commit('data/setEmail', '')
        this.$store.commit('data/setPassword', '')
        this.eMail = this.$store.state.data.email
        console.log('ログアウトしました。')
      }).catch(() => {
        // An error happened.
        this.$router.push('signin')
        console.log('ログアウトできませんでした。')
      })
    }
  }
}
</script>

<style>
/* 共通 */
.navbar {
  background: #3362a8;
}

.logo-area {
  height: 100%;
  display: flex;
  align-items: center;
}

/* タブレット・PC */
@media screen and (min-width: 768px) {
  .navbar {
    height: 80px;
  }

  .logo-area {
    margin-left: 30%;
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

  .logo-area {
    justify-content: center;
  }

  .sublogo {
    width: 60px;
    height: 36px;
  }
}
</style>
