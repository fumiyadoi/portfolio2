<template>
  <div class="columns is-mobile is-centered" style="width: 100%; margin: 0;">
    <div class="column is-6-tablet is-11-mobile wrapper-top">
      <div class="columns is-mobile is-multiline">
        <div class="column is-12 mt-4 has-text-weight-semibold" style="color: #404a72;">メールアドレス：{{email}}</div>
        <div class="column is-12 mt-4 has-text-weight-semibold" style="color: #404a72;">ユーザーID：{{userId}}</div>
        <div class="column is-12 mt-4 has-text-weight-semibold" style="color: #404a72;">ユーザー区分：{{admin}}</div>
        <div class="column is-12 mt-4 has-text-weight-semibold" style="color: #404a72;">作成日時：{{createAt}}</div>
        <div class="column is-12 mt-4 mb-4 has-text-weight-semibold" style="color: #404a72;">最終ログイン日時：{{signAt}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../plugins/firebase.js'
import { doc, getDoc } from 'firebase/firestore'

export default {
  layout: 'defaultTop',
  data () {
    return {
      Ref: 'userlist', /* ここにnavberの戻るボタンの遷移先を入れください（by fumiya 2021.12.5） */
      Title: 'ユーザー情報', /* ここにnavberのタイトルを入れください（by fumiya 2021.12.5） */
      email: '',
      userId: '',
      admin: '',
      createAt: '',
      signAt: ''
    }
  },
  async mounted () {
    this.updateRef()/* navbarの戻るボタンの遷移先の受け渡し */
    this.updateTitle()/* navbarのタイトルの受け渡し */
    /* firebaseからユーザー情報を取得します */
    const docRef = doc(db, 'users', this.$store.state.data.userInfoId)
    const docSnap = await getDoc(docRef)
    this.email = docSnap.data().email
    this.userId = docSnap.data().uid
    if (docSnap.data().admin) {
      this.admin = '管理者'
    } else {
      this.admin = '一般ユーザー'
    }
    const createDate = docSnap.data().createdAt.toDate()
    const createYear = createDate.getFullYear()
    const createMonth = createDate.getMonth() + 1
    const createDay = createDate.getDate()
    const createHour = createDate.getHours()
    const createMinute = createDate.getMinutes()
    const createSecond = createDate.getSeconds()
    this.createAt = createYear + '年' + createMonth + '月' + createDay + '日 ' + createHour + ':' + createMinute + ':' + createSecond
    const signDate = docSnap.data().signAt.toDate()
    const signYear = signDate.getFullYear()
    const signMonth = signDate.getMonth() + 1
    const signDay = signDate.getDate()
    const signHour = signDate.getHours()
    const signMinute = signDate.getMinutes()
    const signSecond = signDate.getSeconds()
    this.signAt = signYear + '年' + signMonth + '月' + signDay + '日 ' + signHour + ':' + signMinute + ':' + signSecond
  },
  methods: {
    updateRef () {
      this.$nuxt.$emit('updateRef', this.Ref)
    },
    updateTitle () {
      this.$nuxt.$emit('updateTitle', this.Title)
    }
  }
}
</script>

<style>
@media screen and (min-width: 769px) {
  .wrapper-top {
    background: white;
  }
}
</style>
