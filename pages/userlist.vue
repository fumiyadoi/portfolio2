<template>
  <div class="columns is-mobile is-centered" style="width: 100%; margin: 0;">
    <div class="column is-6-tablet is-11-mobile wrapper-top">
      <div class="columns is-mobile is-multiline">
        <div class="column is-12 mt-5 has-text-weight-semibold" style="color: #404a72;">ユーザー一覧</div>
      </div>
      <div class="container table-container" >
        <table class="table">
          <thead>
            <tr>
              <th>メールアドレス</th>
              <th>ユーザー区分</th>
              <th>作成日時</th>
              <th>最終ログイン日時</th>
            </tr>
          </thead>
          <tbody>
            <tr @click="goUserInfo(index)" v-for="(email, index) in userEmails" v-bind:key="email" style="cursor: pointer;">
              <td>{{email}}</td>
              <td>{{admins[index]}}</td>
              <td>{{createAts[index]}}</td>
              <td>{{signAts[index]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="select is-multiple mb-5" style="width: 100%;">
        <select multiple size="8" style="width: 100%;">
          <option @click="goUserInfo(index)" v-for="(email, index) in userEmails" :key="email" value="email">{{email}}</option>
        </select>
      </div> -->
      <!-- <hr class="hr div-center">
      新規登録画面 -->
      <div class="is-grouped div-center">
        <div class="control">
          <button class="button signup-button is-white" id="new-button" @click="createUserAccount">新規登録</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../plugins/firebase.js'
import { collection, getDocs } from 'firebase/firestore'

export default {
  layout: 'defaultList',
  data () {
    return {
      Ref: '/', /* ここにnavberの戻るボタンの遷移先を入れください（by fumiya 2021.12.5） */
      Title: 'ユーザー一覧', /* ここにnavberのタイトルを入れください（by fumiya 2021.12.5） */
      userIds: [],
      userEmails: [],
      admins: [],
      createAts: [],
      signAts: []
    }
  },
  async mounted () {
    this.updateRef()/* navbarの戻るボタンの遷移先の受け渡し */
    this.updateTitle()/* navbarのタイトルの受け渡し */
    /* firebaseからユーザー情報を取得します */
    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach((doc) => {
      this.userIds.push(doc.id)
      this.userEmails.push(doc.data().email)
      if (doc.data().admin) {
        this.admins.push('管理者')
      } else {
        this.admins.push('一般ユーザー')
      }
      const createDate = doc.data().createdAt.toDate()
      const createYear = createDate.getFullYear()
      const createMonth = createDate.getMonth() + 1
      const createDay = createDate.getDate()
      const createHour = createDate.getHours()
      const createMinute = createDate.getMinutes()
      const createSecond = createDate.getSeconds()
      this.createAts.push(createYear + '年' + createMonth + '月' + createDay + '日 ' + createHour + ':' + createMinute + ':' + createSecond)
      const signDate = doc.data().signAt.toDate()
      const signYear = signDate.getFullYear()
      const signMonth = signDate.getMonth() + 1
      const signDay = signDate.getDate()
      const signHour = signDate.getHours()
      const signMinute = signDate.getMinutes()
      const signSecond = signDate.getSeconds()
      this.signAts.push(signYear + '年' + signMonth + '月' + signDay + '日 ' + signHour + ':' + signMinute + ':' + signSecond)
    })
  },
  methods: {
    updateRef () {
      this.$nuxt.$emit('updateRef', this.Ref)
    },
    updateTitle () {
      this.$nuxt.$emit('updateTitle', this.Title)
    },
    goUserInfo (index) {
      this.$store.commit('data/setUserInfoId', this.userIds[index])
      this.$router.push('userinfo')
    },
    createUserAccount () {
      this.$router.push('signup')
    }
  }
}
</script>

<style>
.signup-button {
  width: 343px;
  height: 52px;
  border-radius: 10px;
}

.div-center {
  margin-left: auto;
  margin-right: auto;
  width: 343px;
}

#new-button {
  color: #3362a8;
  border: 1px solid;
}

table {
  display: block;
  overflow-x: scroll;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  height: 369.5px;
}

.table-container {
  border: 2px solid #dbdbdb;
}

@media screen and (min-width: 769px) {
  .wrapper-top {
    background: white;
  }
}
</style>
