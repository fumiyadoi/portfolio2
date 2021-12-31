<template>
  <div class="columns is-mobile is-centered" style="width: 100%; margin: 0;">
    <div class="column is-4-tablet is-11-mobile wrapper-top">
      <div class="columns is-mobile is-multiline is-vcentered">
        <div class="column is-12 mt-5">
          <div class="columns is-vcentered is-mobile">
            <div class="column is-6 has-text-weight-semibold" style="color: #404a72;">教材</div>
            <div class="column is-6 is-size-7 has-text-right"><span @click="goBookList" style="color: #a2a1a0;">一覧・編集&emsp;&gt;</span></div>
          </div>
        </div>
        <div class="column is-12">
          <div class="columns is-centered is-mobile">
            <button class="select-button" @click="onSelectModal">{{ selectedTitle }}</button>
          </div>
        </div>
        <div class="modal" id="modal" v-bind:class="modal_class">
          <div class="modal-background" id="modal-background"></div>
          <div class="modal-content has-background-white" id="modal-content-top" style="border-radius: 8px;">
            <div class="column is-12">
              <div class="columns is-mobile is-vcentered" id="modalnav">
                <div class="column is-2"></div>
                <div class="column is-8 has-text-weight-semibold has-text-centered" style="color: #404a72;">教材選択</div>
                <div class="column is-2 has-text-weight-semibold has-text-right" style="font-size: 1.5em; color: #404a72;"><span @click="onSelectModal" id="close">×</span></div>
              </div>
            </div>
            <div v-for="(bookidtitle, index) in bookList" :key="bookidtitle[0]">
              <hr>
              <div class="column is-12" @click="selectBook(bookidtitle[0])">
                <div class="columns is-mobile is-vcentered">
                  <div class="column is-1 has-text-weight-semibold has-text-centered" style="color: #f18d1d; transition: all 0.3s;">{{checkLetters[index]}}</div>
                  <div class="column is-11" :style="bookTitleStyles[index]">{{bookidtitle[1]}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-12 has-text-weight-semibold mt-2" style="color: #404a72;">速度</div>
        <div class="column is-12">
          <div class="columns is-centered is-vcentered is-mobile">
            <figure class="image" style="display: flex; align-items: center;">
              <Min style="width: 40px; height: 40px;"/>
            </figure>
            <vue-slider @change="changeSpeed()" style="width: 70%;" ref="slider" v-model="speed" :min=1 :max=100></vue-slider>
            <figure class="image" style="display: flex; align-items: center;">
              <Max style="width: 40px; height: 40px;"/>
            </figure>
          </div>
        </div>
        <div class="column is-12 has-text-weight-semibold mt-3" style="color: #404a72;">文字サイズ</div>
        <div class="column is-12 mt-2">
          <div class="columns is-centered is-mobile">
            <button class="size-button" id="small" v-bind:style="styles1" @click="$store.commit('data/fontsizeSmall')">小</button>
            <div class="column is-2"></div>
            <button class="size-button" id="medium" v-bind:style="styles2" @click="$store.commit('data/fontsizeMedium')">中</button>
            <div class="column is-2"></div>
            <button class="size-button" id="large" v-bind:style="styles3" @click="$store.commit('data/fontsizeLarge')">大</button>
          </div>
        </div>
        <div class="column is-12 mt-6 mb-6">
          <div class="columns is-centered is-mobile">
            <button class="button has-text-white start-button" @click="startSokutore">スタート</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../plugins/firebase.js'
import { collection, getDocs, query, where } from 'firebase/firestore'
import Button from '~/assets/FormParts_Button.svg'
import Logo from '~/assets/sublogo.svg'
import Setting from '~/assets/Accessory_settings.svg'
import Min from 'assets/Accessory_speed_low.svg'
import Max from 'assets/Accessory_speed_max.svg'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  layout: 'defaultTop',
  data () {
    return {
      bookList: [],
      selectedTitle: undefined,
      Ref: '/', /* ここにnavberの戻るボタンの遷移先を入れください（by fumiya 2021.12.5） */
      Title: '速読', /* ここにnavberのタイトルを入れください（by fumiya 2021.12.5） */
      modal_class: '',
      checkStyles: [],
      checkLetters: [],
      bookTitleStyles: [],
      speed: 50,
      userId: '',
      styles1: {
        fontSize: '1em',
        padding: '7px 16px',
        borderRadius: '4px',
        transition: 'all 0.3s',
        border: '1px solid #3362a8',
        background: 'white',
        color: '#3362a8',
        fontWeight: 'bold',
        boxShadow: '0 2px 3px #00000029'
      },
      styles2: {
        fontSize: '1em',
        padding: '7px 16px',
        borderRadius: '4px',
        transition: 'all 0.3s',
        border: '1px solid #3362a8',
        background: 'white',
        color: '#3362a8',
        fontWeight: 'bold',
        boxShadow: '0 2px 3px #00000029'
      },
      styles3: {
        fontSize: '1em',
        padding: '7px 16px',
        borderRadius: '4px',
        transition: 'all 0.3s',
        border: '1px solid #3362a8',
        background: 'white',
        color: '#3362a8',
        fontWeight: 'bold',
        boxShadow: '0 2px 3px #00000029'
      }
    }
  },
  components: {
    Button,
    Logo,
    Setting,
    Min,
    Max,
    VueSlider
  },
  computed: {
    changeStyles: function () {
      return this.$store.state.data.fontsize
    }
  },
  watch: {
    changeStyles () {
      if (this.$store.state.data.fontsize === 'small') {
        this.styles1.color = '#f18d1d'
        this.styles1.border = '1px solid #f18d1d'
        this.styles2.color = '#3362a8'
        this.styles2.border = '1px solid #3362a8'
        this.styles3.color = '#3362a8'
        this.styles3.border = '1px solid #3362a8'
      } else if (this.$store.state.data.fontsize === 'medium') {
        this.styles1.color = '#3362a8'
        this.styles1.border = '1px solid #3362a8'
        this.styles2.color = '#f18d1d'
        this.styles2.border = '1px solid #f18d1d'
        this.styles3.color = '#3362a8'
        this.styles3.border = '1px solid #3362a8'
      } else {
        this.styles1.color = '#3362a8'
        this.styles1.border = '1px solid #3362a8'
        this.styles2.color = '#3362a8'
        this.styles2.border = '1px solid #3362a8'
        this.styles3.color = '#f18d1d'
        this.styles3.border = '1px solid #f18d1d'
      }
    }
  },
  async mounted () {
    // this.$store.commit('tmp')/* 保存しているページ数をリセットします。 */
    this.speed = this.$store.state.data.sokudokuSpeed/* スピードをvuexから取得します。 */
    /* 文字サイズの表示を設定します。 */
    if (this.$store.state.fontsize === 'small') {
      this.styles1.color = '#f18d1d'
      this.styles1.border = '1px solid #f18d1d'
      this.styles2.color = '#3362a8'
      this.styles2.border = '1px solid #3362a8'
      this.styles3.color = '#3362a8'
      this.styles3.border = '1px solid #3362a8'
    } else if (this.$store.state.data.fontsize === 'medium') {
      this.styles1.color = '#3362a8'
      this.styles1.border = '1px solid #3362a8'
      this.styles2.color = '#f18d1d'
      this.styles2.border = '1px solid #f18d1d'
      this.styles3.color = '#3362a8'
      this.styles3.border = '1px solid #3362a8'
    } else {
      this.styles1.color = '#3362a8'
      this.styles1.border = '1px solid #3362a8'
      this.styles2.color = '#3362a8'
      this.styles2.border = '1px solid #3362a8'
      this.styles3.color = '#f18d1d'
      this.styles3.border = '1px solid #f18d1d'
    }
    this.updateRef()/* navbarの戻るボタンの遷移先の受け渡し */
    this.updateTitle()/* navbarのタイトルの受け渡し */
    /* ここからはfirebaseから本のタイトルを取ってくるところ */
    const self = this
    /* ユーザーが作成したコンテンツを取ってきます */
    const q1 = query(collection(db, 'books'), where('createdUserDocumentID', '==', self.$store.state.data.userId), where('admin', '==', false))
    const querySnapshot1 = await getDocs(q1)
    querySnapshot1.forEach((doc) => {
      self.bookList.push([doc.id, doc.data().title])
      /* vuexに本のidが登録されていなかったら0ページで登録 */
      if (self.$store.state.data.bookPages[doc.id] === undefined) {
        self.$store.commit('data/addBook', doc.id)
      }
    })
    /* 共通コンテンツを取ってきます */
    const q2 = query(collection(db, 'books'), where('admin', '==', true))
    const querySnapshot2 = await getDocs(q2)
    querySnapshot2.forEach((doc) => {
      self.bookList.push([doc.id, doc.data().title])
      /* vuexに本のidが登録されていなかったら0ページで登録 */
      if (self.$store.state.data.bookPages[doc.id] === undefined) {
        self.$store.commit('data/addBook', doc.id)
      }
    })
    /* これはモーダルのデザインを設定する処理 */
    let flag = 0 /* bookIdの存在を確かめるための変数 */
    for (let i = 0; i < this.bookList.length; i++) {
      this.checkStyles.push({
        color: '#404a72',
        transition: 'all 0.3s'
      })
      this.checkLetters.push('')
      this.bookTitleStyles.push({
        color: '#404a72',
        transition: 'all 0.3s'
      })
      /* ここでbookIdがないか確認する */
      if (this.bookList[i][0] === this.$store.state.data.bookId) {
        flag = 1
      }
    }
    /* 最初に選択されているタイトルを決定するための処理 */
    if (flag === 0) {
      this.$store.commit('data/changeBookId', this.bookList[0][0])
    }
    this.selectBook(this.$store.state.data.bookId)
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
    changeSpeed () {
      this.$store.commit('data/changeSokudokuSpeed', this.speed)
    },
    startSokutore () {
      this.$router.push('sokudoku')
    },
    goBookList () {
      this.$router.push('booklist')
      this.$store.commit('data/changeIndetifier', 'sokudoku-top')
    },
    onSelectModal () {
      if (this.modal_class === 'is-active') {
        this.modal_class = ''
      } else {
        this.modal_class = 'is-active'
      }
    },
    selectBook (id) {
      for (let i = 0; i < this.bookList.length; i++) {
        if (this.bookList[i][0] === id) {
          this.checkLetters[i] = '✓'
          this.bookTitleStyles[i].color = '#f18d1d'
          this.$store.commit('data/changeBookId', id)
          this.selectedTitle = this.bookList[i][1]
        } else {
          this.checkLetters[i] = ''
          this.bookTitleStyles[i].color = '#404a72'
        }
      }
    }
  }
}
</script>

<style>
.vue-slider-dot-tooltip-inner.vue-slider-dot-tooltip-inner-top {
  border: #f18d1d;
  background-color: #f18d1d;
  visibility: visible;
}

.vue-slider-process {
  background-color: #f18d1d;
}

.vue-slider-dot-handle {
  background-color: #f18d1d;
}

.select-button {
  margin: 12px;
  width: 100%;
  height: 40px;
  border-radius: 8px;
  font-size: 1em;
  padding: 7px 16px;
  transition: all 0.3;
  border: none;
  background: white;
  display: flex;
  justify-content: space-between;
  vertical-align: center;
}

.select-button::after {
  content: '';
  width: 8px;
  height: 8px;
  border-bottom: solid 2px #404a72;
  border-right: solid 2px #404a72;
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  margin: auto 0;
}

.select-button:hover {
  cursor: pointer;
}

.start-button {
  width: 80%;
  height: 40px;
  border-radius: 8px;
  border: none;
  background: #f18d1d;
}

.size-button:hover {
  cursor: pointer;
}

#close:hover {
  cursor: pointer;
}

hr {
  margin: 0;
}

#modal-content-top {
  width: 90%;
}

.modal_class {
  transition: all 0.5;
}

@media screen and (min-width: 769px) {
  .wrapper-top {
    background: white;
  }

  .select-button {
    border: 0.5px solid #c9c8c7;
  }

  #modal-content-top {
    width: 50%;
  }
}
</style>
