<template>
  <div class="columns is-mobile is-centered" style="width: 100%; margin: 0;">
    <div class="column is-4-tablet is-11-mobile wrapper-top">
      <div class="columns is-mobile is-multiline">
        <div class="column is-12 has-text-weight-semibold" style="color: #404a72;">設定１</div>
        <div class="column is-12">
          <div class="columns is-mobile is-centered">
            <div class="column is-10 bookbox" style="border: 2px solid whitesmoke; border-radius: 8px;">
              <button @click="goTop()" class="edit-button" style="color: #404a72;">サンプルテキスト</button>
              <button @click="goTop()" class="edit-button" style="color: #404a72;">サンプルテキスト</button>
              <button @click="goTop()" class="edit-button" style="color: #404a72;">サンプルテキスト</button>
              <button @click="goTop()" class="edit-button" style="color: #404a72;">サンプルテキスト</button>
            </div>
          </div>
        </div>
        <div class="column is-12 has-text-weight-semibold" style="color: #404a72;">サービス</div>
        <div class="column is-12">
          <div class="columns is-mobile is-centered">
            <div class="column is-10 bookbox" style="border: 2px solid whitesmoke; border-radius: 8px;">
              <button @click="goTop()" class="edit-button" style="color: #404a72;">お問合せ（仮）</button>
              <button @click="goTop()" class="edit-button" style="color: #404a72;">利用規約（仮）</button>
              <button @click="logout()" class="edit-button" style="color: #404a72;">ログアウト</button>
            </div>
          </div>
        </div>
        <div class="column is-12" id='logout'>
          <div class="columns is-mobile is-centered">
            <div class="column is-10 bookbox" style="border: 2px solid whitesmoke; border-radius: 8px;">
              <button @click="deleteAccount()" class="edit-button" style="color: red;">アカウント削除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../plugins/firebase.js'
import { doc, collection, getDocs, query, where, deleteDoc } from 'firebase/firestore'
import { getAuth, signOut, deleteUser } from 'firebase/auth'

export default {
  layout: 'defaultTop',
  data () {
    return {
      Ref: '/', /* ここにnavberの戻るボタンの遷移先を入れください（by fumiya 2021.12.5） */
      Title: '設定', /* ここにnavberのタイトルを入れください（by fumiya 2021.12.5） */
      commonList: [],
      userList: []
    }
  },
  async mounted () {
    this.$store.commit('data/falseFlag')
    this.updateRef()/* navbarの戻るボタンの遷移先の受け渡し */
    this.updateButton()/* navbarの戻るボタンの文字の受け渡し */
    this.updateTitle()/* navbarのタイトルの受け渡し */
    /* ここからはfirebaseから本のタイトルを取ってくるところ */
    /* 共通コンテンツを取ってきます */
    const self = this
    const q1 = query(collection(db, 'books'), where('admin', '==', true))
    const querySnapshot1 = await getDocs(q1)
    querySnapshot1.forEach((doc) => {
      self.commonList.push(doc.data().title)
    })
    /* ユーザーが作成したコンテンツを取ってきます */
    const q2 = query(collection(db, 'books'), where('createdUserDocumentID', '==', this.$store.state.data.userId), where('admin', '==', false))
    const querySnapshot2 = await getDocs(q2)
    querySnapshot2.forEach((doc) => {
      self.userList.push(doc.data().title)
    })
  },
  methods: {
    updateRef () {
      this.$nuxt.$emit('updateRef', this.Ref)
    },
    updateButton () {
      this.$nuxt.$emit('updateButton', this.Button)
    },
    updateTitle () {
      this.$nuxt.$emit('updateTitle', this.Title)
    },
    goTop () {
      this.$router.push('/')
    },
    async logout () {
      const auth = await getAuth()
      signOut(auth).then(() => {
        // Sign-out successful.
        this.$router.push('signin')
        this.$store.commit('data/setUserId', '')
        this.$store.commit('data/setEmail', '')
        this.eMail = this.$store.state.data.email
        console.log('ログアウトしました。')
      }).catch(() => {
        // An error happened.
        this.$router.push('signin')
        console.log('ログアウトできませんでした。')
      })
    },
    async deleteAccount () {
      if (window.confirm('アカウントを削除しますか？')) {
        const auth = await getAuth()
        const user = await auth.currentUser
        await deleteDoc(doc(db, 'users', user.uid))
        deleteUser(user).then(() => {
          this.$router.push('signin')
        }).catch(() => {
          alert('アカウントを削除できませんでした')
        })
      }
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

#logout {
  padding-top: 50px;
  color: red;
}

@media screen and (min-width: 769px) {
  .wrapper-top {
    background: white;
  }
}
</style>
