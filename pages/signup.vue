<template>
  <section class="section">
    <!-- 新規登録フォーム -->
    <div class="div-center">
        <label class="label">メールアドレス</label>
        <div class="mt-15">
            <input class="input" type="email" placeholder="メールアドレス" v-model="email">
        </div>
    </div>
    <div class="mt-20 div-center">
        <label class="label">パスワード</label>
        <div class="mt-15">
            <input class="input" type="password" placeholder="パスワード" v-model="password">
        </div>
    </div>
    <div class="mt-30 div-center">
        <div class="control">
            <input type="submit" class="button" id="login-button" value="新規登録" @click="createUserAccount">
        </div>
    </div>
    </section>
</template>

<script>
import { db } from '../plugins/firebase.js'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import Logo from '~/assets/logo.svg'

export default {
  layout: 'defaultTop',
  name: 'signup',
  data () {
    return {
      Ref: 'userlist', /* ここにnavberの戻るボタンの遷移先を入れください（by fumiya 2021.12.5） */
      Title: '新規登録', /* ここにnavberのタイトルを入れください（by fumiya 2021.12.5） */
      email: '',
      password: '',
      authTmp: ''
    }
  },
  components: {
    Logo
  },
  mounted () {
    this.updateRef()/* navbarの戻るボタンの遷移先の受け渡し */
    this.updateTitle()/* navbarのタイトルの受け渡し */
  },
  methods: {
    updateRef () {
      this.$nuxt.$emit('updateRef', this.Ref)
    },
    updateTitle () {
      this.$nuxt.$emit('updateTitle', this.Title)
    },
    async createUserAccount () {
      this.$store.commit('data/toggleRedirect', true)
      const auth = getAuth()
      this.authTmp = auth
      // Firebase Auth へ新規登録
      await createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const uid = userCredential.user.uid
          this.sendEmail(auth.currentUser, uid)
        })
        .catch(() => {
          alert('アカウントの作成に失敗しました。既にメールアドレスが登録されている可能性があります。')
        })
    },
    async sendEmail (currentUser, uid) {
      await sendEmailVerification(currentUser)
        .then(() => {
          this.setUser(uid)
          console.log('メールを送信しました。')
          console.log(currentUser.emailVerified)
        })
    },
    async setUser (uid) {
      await setDoc(doc(db, 'users', uid), {
        admin: false,
        createdAt: serverTimestamp(),
        email: this.email,
        signAt: serverTimestamp(),
        uid: uid
      })
      this.signout(this.authTmp)
    },
    async signout (auth) {
      await signOut(auth)
        .then(() => {
          this.loginOriginal()
          console.log('ログアウトしました。')
        }).catch(() => {
          console.log('ログアウトできませんでした。')
        })
    },
    async loginOriginal () {
      console.log(this.$store.state.data.email)
      console.log(this.$store.state.data.password)
      await signInWithEmailAndPassword(this.authTmp, this.$store.state.data.emailAtLogin, this.$store.state.data.password)
        .then(() => {
          this.$store.commit('data/setEmailTmp', this.email)
          this.$store.commit('data/toggleRedirect', false)
          this.$router.push('signup-thanks')
          console.log('再ログインに成功しました。')
        })
        .catch(() => {
          console.log('再ログインに失敗しました。')
        })
    }
  }
}
</script>

<style>
.center {
  text-align: center;
}

.div-center {
  margin-left: auto;
  margin-right: auto;
  width: 343px;
}

.mt-10 {
  margin-top: 10px;
}

.mt-20 {
  margin-top: 20px;
}

.mt-15 {
  margin-top: 15px;
}

.mt-30 {
  margin-top: 30px;
}

.mt-80 {
  margin-top: 80px;
}

.label {
  color: #404a72;
}

.hr {
  border: 1px solid;
  color: #c9c8c7;
  width: 343px;
}

#login-button {
  width: 343px;
  height: 52px;
  border-radius: 10px;
  color: white;
  background: orange;
}

</style>
