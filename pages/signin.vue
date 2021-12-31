<template>
  <section class="section">
    <div class="columns is-mobile center mt-5">
      <!-- firestoreにデータ追加するテストボタン -->
      <div class="column is-12">
        <Logo width="251" height="108" />
      </div>
    </div>
    <!-- ログインフォーム -->
    <div class="mt-50 div-center">
        <label class="label">メールアドレス</label>
        <div class="mt-15">
            <input v-bind:class="{ 'is-danger': loginFailed }" class="input" type="email" placeholder="メールアドレス" v-model="email">
        </div>
    </div>
    <div class="mt-20 div-center">
        <label class="label">パスワード</label>
        <div class="mt-15">
            <input v-bind:class="{ 'is-danger': loginFailed }" class="input" type="password" placeholder="パスワード" v-model="password">
        </div>
    </div>
    <div v-if="loginFailed" class="div-center mt-1">
        <div class="control is-size-7" style="color: red;">メールアドレス、またはパスワードに誤りがあります。</div>
    </div>
    <div class="mt-30 div-center">
        <div class="control">
            <button class="button" id="login-button" @click="userSignIn">ログイン</button>
        </div>
    </div>
    <!-- パスワードを忘れた方がこちら -->
    <div class="is-grouped div-center mt-30">
        <div class="control center">
            <span @click="goReset" class="center" style="text-decoration: underline;">パスワードを忘れた方はこちら</span>
        </div>
    </div>
    <!-- <hr class="hr div-center">
    新規登録画面
    <div class="is-grouped div-center">
        <div class="control">
            <button class="button is-white" id="new-button" @click="createUserAccount">新規登録</button>
        </div>
    </div> -->
  </section>
</template>

<script>
import Logo from '~/assets/logo.svg'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { updateDoc, doc, getFirestore, serverTimestamp } from 'firebase/firestore'

export default {
  name: 'signin',
  layout: 'defaultSignin',
  data () {
    return {
      email: '',
      password: '',
      loginFailed: false
    }
  },
  components: {
    Logo
  },
  methods: {
    async userSignIn () {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          console.log(userCredential)
          const uid = userCredential.user.uid
          const db = getFirestore()
          updateDoc(doc(db, 'users', uid), {
            signAt: serverTimestamp()
          })
          this.$store.commit('data/setPassword', this.password)
          this.$store.commit('data/setUserId', uid)
          this.$store.commit('data/setEmailAtLogin', this.email)
          this.$store.commit('data/toggleRedirect', false)
          this.$router.push('/')
        })
        .catch((e) => {
          this.loginFailed = true
          alert('ログインに失敗しました。')
        })
      try {
        if (!auth.currentUser.emailVerified) {
          signOut(auth).then(() => {
            alert('メール認証されていません')
          }).catch(() => {
            alert('メール認証されていません')
            console.log('ログアウトできませんでした。')
          })
        }
      } catch (error) {
        console.log('ログイン失敗')
      }
    },
    goReset () {
      this.$router.push('resetPassword')
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

.mt-50 {
  margin-top: 50px;
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

#new-button {
  color: #3362a8;
  border: 1px solid;
}

</style>
