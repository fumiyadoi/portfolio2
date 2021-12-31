<template>
  <div class="columns is-mobile is-centered" style="width: 100%; margin: 0;">
    <div class="column is-4-tablet is-11-mobile wrapper-top">
      <div class="columns is-mobile is-multiline">
        <div class="column is-12 has-text-weight-semibold mt-3" style="color: #404a72;">タイトル</div>
        <div class="column is-12">
          <div class="columns is-mobile is-centered">
            <div class="column is-12">
              <input class="input is-size-7" type="text" placeholder="タイトルを入力してください" style="border-radius: 8px;" v-model="bookTitle">
            </div>
          </div>
        </div>
        <div class="column is-12 has-text-weight-semibold" style="color: #404a72;">本文</div>
        <div class="column is-12">
          <div class="columns is-mobile is-centered">
            <div class="column is-12">
              <textarea class="textarea is-size-7" rows="10" placeholder="本文を入力してください" style="border-radius: 8px;" v-model="bookBody"></textarea>
            </div>
          </div>
        </div>
        <div class="column is-12 mt-2">
          <div class="columns is-centered is-mobile">
            <div class="column is-12">
              <button @click="updateBook" class="button update-button">更新</button>
            </div>
          </div>
        </div>
        <div class="column is-12">
          <div class="columns is-centered is-mobile">
            <div class="column is-12">
              <button @click="checkBack" class="button back-button modoru">戻る</button>
            </div>
          </div>
        </div>
        <div class="column is-12 mt-5 mb-5">
          <div class="columns is-centered is-mobile">
            <div class="column is-12">
              <button @click="checkDelete" :style="deleteStyle" class="button back-button Warn">削除</button>
            </div>
          </div>
        </div>
        <div class="modal" id="modal" v-bind:class="modal_class">
          <div class="modal-background" id="modal-background"></div>
          <div class="modal-content has-background-white" id="modal-content-top" style="border-radius: 8px;">
            <div class="column is-12">
              <div class="columns is-mobile is-vcentered" id="modalnav">
                <div class="column is-2"></div>
                <div class="column is-8 has-text-weight-semibold has-text-centered" style="color: #404a72;">{{modalTitle}}</div>
                <div class="column is-2 has-text-weight-semibold has-text-right" style="font-size: 1.5em; color: #404a72;"><span @click="onSelectModal" id="close">×</span></div>
              </div>
            </div>
            <hr>
            <div class="column is-12 has-text-weight-semibold has-text-centered">{{modalBody}}</div>
            <div class="column is-12">
              <div class="columns is-mobile is-vcentered is-multiline">
                <div class="column is-6">
                  <button @click="onSelectModal" class="button back-button is-size-7">{{modalCancel}}</button>
                </div>
                <div class="column is-6">
                  <button @click="backDelete" class="button back-button Warn is-size-7">{{modalAccept}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../plugins/firebase.js'
import { doc, getDoc, updateDoc, deleteDoc, serverTimestamp, addDoc, collection } from 'firebase/firestore'

export default {
  layout: 'defaultEdit',
  data () {
    return {
      Ref: 'booklist', /* ここにnavberの戻るボタンの遷移先を入れください（by fumiya 2021.12.5） */
      Title: '教材の編集', /* ここにnavberのタイトルを入れください（by fumiya 2021.12.5） */
      list: [],
      modalTitle: '',
      modalBody: '',
      modalCancel: '',
      modalAccept: '',
      isBack: true,
      bookTitleInitial: '',
      bookTitle: '',
      bookBodyInitial: '',
      bookBody: '',
      deleteStyle: {
        display: 'none'
      },
      modal_class: ''
    }
  },
  async mounted () {
    /* navbarに入れる値を受け渡します */
    this.$nuxt.$emit('updateRef', this.Ref)/* navbarの戻るボタンの遷移先の受け渡し */
    this.$nuxt.$emit('updateTitle', this.Title)/* navbarのタイトルの受け渡し */
    /* ここからは文章追加か編集の判断を行います */
    if (this.$store.state.data.flag) {
      /* ここからは一番のボタンの表記を設定します */
      this.deleteStyle.display = 'block'
      /* ここからは表示する本の中身をfirebaseから取ってくるところ */
      const self = this
      const docRef = doc(db, 'books', self.$store.state.data.bookId)
      const docSnap = await getDoc(docRef)
      self.bookTitleInitial = docSnap.data().title
      self.bookTitle = docSnap.data().title
      self.bookBodyInitial = docSnap.data().content
      self.bookBody = docSnap.data().content
    }
    /* navbarに入れる値を受け渡します */
    this.$nuxt.$emit('updateBookTitleInitial', this.bookTitleInitial)/* navbarへ本のタイトルの編集前を受け渡します */
    this.$nuxt.$emit('updateBookTitle', this.bookTitle)/* navbarへ本のタイトルの編集後を受け渡します */
    this.$nuxt.$emit('updateBookBodyInitial', this.bookBodyInitial)/* navbarへ本の中身の編集前を受け渡します */
    this.$nuxt.$emit('updateBookBody', this.bookBody)/* navbarへ本の中身の編集後を受け渡します */
  },
  watch: {
    bookTitle: function (newVal, oldVal) {
      this.updateNavbar()
    },
    bookBody: function (newVal, oldVal) {
      this.updateNavbar()
    }
  },
  methods: {
    updateNavbar () {
      this.$nuxt.$emit('updateRef', this.Ref)/* navbarの戻るボタンの遷移先の受け渡し */
      this.$nuxt.$emit('updateTitle', this.Title)/* navbarのタイトルの受け渡し */
      this.$nuxt.$emit('updateBookTitleInitial', this.bookTitleInitial)/* navbarへ本のタイトルの編集前を受け渡します */
      this.$nuxt.$emit('updateBookTitle', this.bookTitle)/* navbarへ本のタイトルの編集後を受け渡します */
      this.$nuxt.$emit('updateBookBodyInitial', this.bookBodyInitial)/* navbarへ本の中身の編集前を受け渡します */
      this.$nuxt.$emit('updateBookBody', this.bookBody)/* navbarへ本の中身の編集後を受け渡します */
    },
    onSelectModal () {
      if (this.modal_class === 'is-active') {
        this.modal_class = ''
      } else {
        this.modal_class = 'is-active'
      }
    },
    checkBack () {
      if (this.bookTitleInitial === this.bookTitle && this.bookBodyInitial === this.bookBody) {
        this.$router.push('booklist')
      } else {
        this.modalTitle = '確認'
        this.modalBody = '入力内容の変更が保存されませんが戻りますか？'
        this.modalCancel = 'いいえ'
        this.modalAccept = 'はい'
        this.isBack = true
        this.onSelectModal()
      }
    },
    checkDelete () {
      this.modalTitle = '教材の削除'
      this.modalBody = '「' + this.bookTitle + '」を削除しますか？'
      this.modalCancel = 'キャンセル'
      this.modalAccept = '削除'
      this.isBack = false
      this.onSelectModal()
    },
    async updateBook () {
      const self = this
      if (self.$store.state.data.flag) {
        const bookRef = doc(db, 'books', self.$store.state.data.bookId)
        await updateDoc(bookRef, {
          title: self.bookTitle,
          content: self.bookBody,
          updatedAt: serverTimestamp()
        })
      } else {
        await addDoc(collection(db, 'books'), {
          admin: false,
          content: self.bookBody,
          createdAt: serverTimestamp(),
          createdUser: 'users/' + self.$store.state.data.userId,
          createdUserDocumentID: self.$store.state.data.userId,
          title: self.bookTitle,
          updatedAt: serverTimestamp()
        })
      }
      self.$router.push('booklist')
    },
    async backDelete () {
      if (this.isBack) {
        this.$router.push('booklist')
      } else {
        const self = this
        await deleteDoc(doc(db, 'books', self.$store.state.data.bookId))
        self.$store.commit('data/deleteBook', self.$store.state.data.bookId)
        self.$router.push('booklist')
      }
    }
  }
}
</script>

<style>
.button:hover {
  color: white;
}

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
  background: white;
}

.back-button {
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background: white;
}

.modoru {
  border: 1px solid #3362a8;
  color: #3362a8;
}

.Warn {
  border: 1px solid red;
  color: red;
}

.update-button {
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: none;
  background: #f18d1d;
  color: white;
}

#close:hover {
  cursor: pointer;
}

#modal-content-top {
  width: 90%;
}

@media screen and (min-width: 769px) {
  .wrapper-top {
    background: white;
  }

  #modal-content-top {
    width: 50%;
  }
}
</style>
