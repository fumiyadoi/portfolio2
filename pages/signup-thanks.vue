<template>
  <section class="section">
    <div class="div-center text-box">
      <div class='text'>
        <p class="pd-15" id="new-text">
          新規登録のご案内メールを送信しました。
        </p>
        <p>
          {{emailTmp}}にメールを送信しました。
          <br>
          メールを確認頂き、メールに記述されたURLをクリックして、新規登録手続きを完了してください。
        </p>
      </div>
    </div>
    <div class="div-center mt-20">
        <div class="control">
            <input type="submit" class="button" id="login-back-button" value="ユーザー一覧に戻る" @click="goUserList">
        </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'defaultSignin',
  data () {
    return {
      emailTmp: ''
    }
  },
  name: 'signup-thanks',
  mounted () {
    this.emailTmp = this.$store.state.data.emailTmp
    this.$store.commit('data/setEmailTmp', '')
  },
  methods: {
    goUserList () {
      this.$router.push('userlist')
    }
  }
}
</script>

<style>
p {
  line-height: 150%;
}

.text-box {
  background-color: white;
  border-radius: 10px;
}

.text {
  padding: 15px;
}

.div-center {
  margin-left: auto;
  margin-right: auto;
  width: 343px;
}

.mt-20 {
  margin-top: 20px;
}

.mt-15 {
  margin-top: 15px;
}

.pd-15 {
  padding-top: 15px;
  padding-bottom: 15px;
}

#login-back-button {
  width: 343px;
  height: 52px;
  border-radius: 10px;
  color: #3362a8;
  border: 1px solid;
}

#new-text {
  color: #3362a8;
  font-weight: 700;
  font-size: 20px;
}

</style>
