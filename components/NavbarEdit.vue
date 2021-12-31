<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="columns is-mobile  is-vcentered" style="margin: 0; height: 100%;">
      <div class="column is-2 has-text-right-tablet" style="display: flex; align-items: center;" v-bind:class="{ 'is-hidden': burgerVisibillity }">
        <LeftArrow @click="checkBack" class="leftarrow" style="width: 44px; height: 44px;" />
      </div>
      <div class="column is-2" v-bind:class="{ 'is-hidden': !burgerVisibillity }"></div>
      <div class="column is-2"></div>
      <div class="column is-4 has-text-white has-text-centered">{{ title }}</div>
      <template v-if="isLogin">
        <div class="column is-3 is-hidden-touch has-text-white has-text-right is-size-7" style="word-wrap: break-word;">{{ eMail }}</div>
        <div class="column is-1 is-hidden-touch has-text-white has-text-centered is-size-7"><span @click="logout">ログアウト</span></div>
        <a role="button" class="navbar-burger is-hidden-desktop has-text-white" aria-label="menu" aria-expanded="false" @click="changeBurgerVisibillity" v-bind:class="{ 'is-active': burgerVisibillity }">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </template>
      <template v-else>
        <div class="column is-4 has-text-white has-text-right is-size-7"><span @click="logout">ログイン</span></div>
      </template>
    </div>
    <div class="navbar-menu is-hidden-desktop" v-bind:class="{ 'is-active': burgerVisibillity }">
      <div class="navbar-item" style="cursor: default;">{{ eMail }}</div>
      <a class="navbar-item" @click="logout">ログアウト</a>
    </div>
    <div class="modal" id="modal" v-bind:class="modal_class">
      <div class="modal-background" id="modal-background"></div>
      <div class="modal-content has-background-white" id="modal-content-top" style="border-radius: 8px;">
        <div class="column is-12">
          <div class="columns is-mobile is-vcentered" id="modalnav">
            <div class="column is-2"></div>
            <div class="column is-8 has-text-weight-semibold has-text-centered" style="color: #404a72;">確認</div>
            <div class="column is-2 has-text-weight-semibold has-text-right" style="font-size: 1.5em; color: #404a72;"><span @click="onSelectModal" id="close">×</span></div>
          </div>
        </div>
        <hr>
        <div class="column is-12 has-text-weight-semibold has-text-centered">入力内容の変更が保存されませんが戻りますか？</div>
        <div class="column is-12">
          <div class="columns is-mobile is-vcentered is-multiline">
            <div class="column is-6">
              <button @click="onSelectModal" class="button back-button is-size-7">いいえ</button>
            </div>
            <div class="column is-6">
              <button @click="goBookList" class="button back-button Warn is-size-7">はい</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import LeftArrow from '~/assets/Accessory_Left_Arrow.svg'

export default {
  data () {
    return {
      eMail: '',
      isLogin: false,
      burgerVisibillity: false,
      modal_class: ''
    }
  },
  components: {
    LeftArrow
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    bookTitleInitial: {
      type: String,
      default: ''
    },
    bookTitle: {
      type: String,
      default: ''
    },
    bookBodyInitial: {
      type: String,
      default: ''
    },
    bookBody: {
      type: String,
      default: ''
    }
  },
  async mounted () {
    console.log(this.$router.history.current.name)
    this.eMail = this.$store.state.data.email
    const auth = await getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // ログインしている
        this.$store.commit('data/setUserId', user.uid)
        this.$store.commit('data/setEmail', user.email)
        this.eMail = this.$store.state.data.email
        this.isLogin = true
        console.log('ログインしている' + user.email)
      } else {
        // ログインしていない場合はリダイレクトします
        this.$router.push('signin')
        console.log('リダイレクトします')
        this.$store.commit('data/setUserId', '')
        this.$store.commit('data/setEmail', '')
        this.isLogin = false
      }
    })
  },
  methods: {
    checkBack () {
      console.log('a')
      // this.onSelectModal()
      if (this.bookTitleInitial === this.bookTitle && this.bookBodyInitial === this.bookBody) {
        this.$emit('componentRef')
      } else {
        this.onSelectModal()
      }
    },
    isClose () {
      if (this.burgerVisibillity) {
        this.changeBurgerVisibillity()
      }
    },
    changeBurgerVisibillity () {
      this.burgerVisibillity = !this.burgerVisibillity
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
    },
    onSelectModal () {
      if (this.modal_class === 'is-active') {
        this.modal_class = ''
      } else {
        this.modal_class = 'is-active'
      }
    },
    goBookList () {
      this.$emit('componentRef')
    }
  }
}
</script>

<style>
/* 共通 */
.navbar {
  background: #3362a8;
  height: 58px;
}

.navbar-burger span {
  height: 2px;
}

span:hover {
  cursor: pointer;
}

.leftarrow:hover {
  cursor: pointer;
}

#close:hover {
  cursor: pointer;
}

#modal-content-top {
  width: 90%;
}

@media screen and (min-width: 769px) {
  .navbar {
    height: 80px;
    display: block;
  }

  #modal-content-top {
    width: 50%;
  }
}
</style>
