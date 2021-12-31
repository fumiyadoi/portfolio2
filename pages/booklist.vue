<template>
  <div class="columns is-mobile is-centered" style="width: 100%; margin: 0;">
    <div class="column is-4-tablet is-11-mobile wrapper-top">
      <div class="columns is-mobile is-multiline">
        <div class="column is-12 mt-5 has-text-weight-semibold" style="color: #404a72;">教材</div>
        <div v-if="anyBook" class="column is-12">
          <div class="columns is-mobile is-centered" style="margin: 0;">
            <div class="column is-12 bookbox" style="border: 2px solid whitesmoke; border-radius: 8px;">
              <div v-for="(booktitle, index) in userList" :key="booktitle[0]">
                <hr v-if="index != 0">
                <button @click="goEdit(booktitle[0])" class="edit-button" style="color: #404a72;">{{booktitle[1]}}</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="column is-12 has-text-centered">まだ教材が登録されていません</div>
        <div class="column is-12 mt-2">
          <div class="columns is-mobile is-centered" style="margin: 0;">
            <div class="column is-12 bookbox" style="border: 2px solid whitesmoke; border-radius: 8px;">
              <div v-for="(booktitle, index) in commonList" :key="booktitle[0]">
                <hr v-if="index != 0">
                <button class="book-button" style="color: #404a72;">{{booktitle[1]}}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-12 mt-3 mb-6">
          <div class="columns is-centered is-mobile" style="margin: 0;">
            <div class="column is-12" style="padding: 0;">
              <button @click="goAdd" class="button add-button">新しい教材を追加</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../plugins/firebase.js'
import { collection, getDocs, query, where } from 'firebase/firestore'

export default {
  layout: 'defaultList',
  data () {
    return {
      Ref: '', /* ここにnavberの戻るボタンの遷移先を入れください（by fumiya 2021.12.5） */
      Title: '教材一覧・編集', /* ここにnavberのタイトルを入れください（by fumiya 2021.12.5） */
      commonList: [],
      userList: [],
      anyBook: false
    }
  },
  async mounted () {
    this.Ref = this.$store.state.data.backIdentifier
    this.$store.commit('data/falseFlag')
    this.updateRef()/* navbarの戻るボタンの遷移先の受け渡し */
    this.updateTitle()/* navbarのタイトルの受け渡し */
    /* ここからはfirebaseから本のタイトルを取ってくるところ */
    /* 共通コンテンツを取ってきます */
    const self = this
    const q1 = query(collection(db, 'books'), where('admin', '==', true))
    const querySnapshot1 = await getDocs(q1)
    querySnapshot1.forEach((doc) => {
      self.commonList.push([doc.id, doc.data().title])
    })
    /* ユーザーが作成したコンテンツを取ってきます */
    const q2 = query(collection(db, 'books'), where('createdUserDocumentID', '==', this.$store.state.data.userId), where('admin', '==', false))
    const querySnapshot2 = await getDocs(q2)
    querySnapshot2.forEach((doc) => {
      self.userList.push([doc.id, doc.data().title])
    })
    if (this.userList.length > 0) {
      this.anyBook = true
    }
  },
  methods: {
    updateRef () {
      this.$nuxt.$emit('updateRef', this.Ref)
    },
    updateTitle () {
      this.$nuxt.$emit('updateTitle', this.Title)
    },
    goAdd () {
      this.$router.push('bookedit')
    },
    goEdit (id) {
      this.$store.commit('data/changeBookId', id)
      this.$store.commit('data/trueFlag')
      this.$router.push('bookedit')
    }
  }
}
</script>

<style>
.edit-button {
  width: 100%;
  height: 40px;
  font-size: 1em;
  transition: all 0.3;
  padding: 7px 16px;
  display: flex;
  border: none;
  background: none;
  justify-content: space-between;
  vertical-align: center;
}

.edit-button::after {
  content: '';
  width: 8px;
  height: 8px;
  border-bottom: solid 2px #404a72;
  border-right: solid 2px #404a72;
  -ms-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  margin: auto 0;
}

.edit-button:hover {
  cursor: pointer;
}

.book-button {
  width: 100%;
  height: 40px;
  font-size: 1em;
  transition: all 0.3;
  padding: 7px 16px;
  display: flex;
  border: none;
  background: none;
  justify-content: space-between;
  vertical-align: center;
}

hr {
  margin: 0;
}

.bookbox {
  padding: 0;
  background: white;
}

.add-button {
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #3362a8;
  color: #3362a8;
  background: white;
}

@media screen and (min-width: 769px) {
  .wrapper-top {
    background: white;
  }
}
</style>
