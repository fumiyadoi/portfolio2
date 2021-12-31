<template>
  <section class="section">
    <div class="mt-50 div-center">
      <div class="box">
        ご登録頂いているメールアドレスを入力して、「送信する」ボタンを押してください。 <br>ご登録のメールアドレス宛にパスワード再設定のための認証メールが送信されます。
      </div>
    </div>
    <!-- ログインフォーム -->
    <div class="mt-50 div-center">
      <label class="label">メールアドレス</label>
      <div class="mt-15">
        <input v-bind:class="{ 'is-danger': sendFailed }" class="input" type="email" placeholder="メールアドレス" v-model="email">
      </div>
    </div>
    <div v-if="sendFailed" class="div-center mt-1">
      <div class="control is-size-7" style="color: red;">メールアドレスに誤りがあります。</div>
    </div>
    <div class="mt-30 div-center">
      <div class="control">
        <button class="button" id="send-button" @click="sendEmail">メールを送信</button>
      </div>
    </div>
  </section>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

export default {
  name: 'signin',
  layout: 'defaultResetPassword',
  data () {
    return {
      email: '',
      sendFailed: false
    }
  },
  methods: {
    async sendEmail () {
      const auth = await getAuth()
      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          alert('パスワード再設定用のメールを送信しました')
          this.$router.push('signin')
        })
        .catch((e) => {
          this.sendFailed = true
          alert('登録されていないメールアドレスです')
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

.box {
  box-shadow: none;
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

#send-button {
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
