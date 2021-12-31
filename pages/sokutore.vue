<template>
  <div class="columns is-mobile is-centered" style="width: 100%; height: 80%; margin: 0;">
    <div class="column is-4-tablet is-11-mobile">
      <div class="columns is-mobile is-multiline is-centered is-vcentered">
        <div class="column is-12 wrapper-content mb-5 tategaki-wrapper">
          <div class="tategaki pt-3 pb-1" v-bind:class="{'is-size-8-sokutore': small, 'is-size-7-sokutore': medium, 'is-size-6-sokutore': large}">
            <div class="trimmed-wrapper">
              <span :style="highlightStyle[0]">{{firstLetter[page]}}</span>
              <span>{{trimmed[page]}}</span>
              <span :style="highlightStyle[1]">{{lastLetter[page]}}</span>
            </div>
            <div class="trimmed-wrapper">
              <span :style="highlightStyle[2]">{{firstLetter[page+1]}}</span>
              <span>{{trimmed[page+1]}}</span>
              <span :style="highlightStyle[3]">{{lastLetter[page+1]}}</span>
            </div>
            <div class="trimmed-wrapper">
              <span :style="highlightStyle[4]">{{firstLetter[page+2]}}</span>
              <span>{{trimmed[page+2]}}</span>
              <span :style="highlightStyle[5]">{{lastLetter[page+2]}}</span>
            </div>
          </div>
          <div class="is-size-7 has-text-centered">{{(page / 3 + 1) +'/'+length}}</div>
        </div>
        <div class="column is-12 wrapper-content">
          <div class="columns is-mobile is-vcentered">
            <div class="column is-6 has-text-left"><span class="p-2 is-size-7" id="sokutore_button" @click="nextPage">&lt; 次へ</span></div>
            <div class="column is-6 has-text-right"><span class="p-2 is-size-7" id="sokutore_button" @click="goTopPage">最初に戻る >|</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../plugins/firebase.js'
import { doc, getDoc } from 'firebase/firestore'

export default {
  layout: 'defaultContent',
  data () {
    return {
      Ref: 'sokutore-top', /* ここにnavberの戻るボタンの遷移先を入れください（by fumiya 2021.12.5） */
      bookTitle: '',
      body: '',
      trimmed: [],
      firstLetter: [],
      lastLetter: [],
      highlightStyle: [],
      n: 0,
      intervalId: undefined,
      length: '',
      page: '',
      small: false,
      medium: true,
      large: false,
      speed: 50
    }
  },
  async mounted () {
    this.speed = this.$store.state.data.sokutoreSpeed/* スピードをvuexから取得します。 */
    /* 文字サイズを設定します。 */
    if (this.$store.state.data.fontsize === 'small') {
      this.small = true
      this.medium = false
      this.large = false
    } else if (this.$store.state.data.fontsize === 'medium') {
      this.small = false
      this.medium = true
      this.large = false
    } else {
      this.small = false
      this.medium = false
      this.large = true
    }
    this.updateRef()/* navbarの戻るボタンの遷移先の受け渡し */
    this.updateTitle()/* navbarのタイトルの受け渡し */
    /* ここからは表示する本の中身をfirebaseから取ってくるところ */
    const self = this
    const docRef = doc(db, 'books', self.$store.state.data.bookId)
    const docSnap = await getDoc(docRef)
    self.body = docSnap.data().content
    self.bookTitle = docSnap.data().title
    /* 本の中身を40文字ずつに分割します */
    for (let i = 0; i < this.body.length / 40; i++) {
      if (i === this.body.length / 40 - 1) {
        this.firstLetter.push(this.body.charAt(i * 40))
        this.trimmed.push(this.body.slice(i * 40 + 1, this.body.length - 1))
        this.lastLetter.push(this.body.charAt(this.body.length - 1))
      } else {
        this.firstLetter.push(this.body.charAt(i * 40))
        this.trimmed.push(this.body.slice(i * 40 + 1, (i + 1) * 40 - 1))
        this.lastLetter.push(this.body.charAt((i + 1) * 40 - 1))
      }
    }
    /* 全ページ数と現在ページの表示を設定します。 */
    this.page = this.$store.state.data.bookPages[this.$store.state.data.bookId][1]
    this.length = Math.ceil(this.trimmed.length / 3)
    /* 最初のページのハイライト表示を開始します。 */
    this.highlight()
  },
  destroyed () {
    clearInterval(this.intervalId)
  },
  methods: {
    nextPage () {
      if (this.$store.state.data.bookPages[this.$store.state.data.bookId][1] / 3 < this.length - 1) {
        this.$store.commit('data/changePage', 1)
        this.page = this.$store.state.data.bookPages[this.$store.state.data.bookId][1]
        this.highlight()
      }
    },
    goTopPage () {
      clearInterval(this.intervalId)
      this.isPlay = false
      this.$store.commit('data/goTopPage', 1)
      this.page = this.$store.state.data.bookPages[this.$store.state.data.bookId][1]
      this.highlight()
    },
    pauseChangePage () {
      clearInterval(this.intervalId)
      this.isPlay = false
    },
    playChangePage () {
      if (!this.isPlay) {
        this.intervalId = setInterval(() => {
          this.isPlay = true
          this.changePage()
        }, -100 * this.speed + 10100)
      }
    },
    updateRef () {
      this.$nuxt.$emit('updateRef', this.Ref)
    },
    updateButton () {
      this.$nuxt.$emit('updateButton', this.Button)
    },
    updateTitle () {
      this.$nuxt.$emit('updateTitle', this.bookTitle)
    },
    highlight () {
      /* ハイライトの初期表示を設定します。 */
      this.n = 0
      clearInterval(this.intervalId)
      this.highlightStyle = []
      for (let i = 0; i < 6; i++) {
        if (i === 0) {
          this.highlightStyle.push({ background: 'yellow' })
        } else {
          this.highlightStyle.push({ background: 'none' })
        }
      }
      /* ハイライトの移動処理を開始します。 */
      this.intervalId = setInterval(() => {
        if (this.n < 5) {
          for (let i = 0; i < 6; i++) {
            if (i === this.n + 1) {
              this.highlightStyle[i].background = 'yellow'
            } else {
              this.highlightStyle[i].background = 'none'
            }
          }
          this.n++
        }
      }, -100 * this.speed + 10100)
    }
  }
}
</script>

<style>
.tategaki-wrapper {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.tategaki {
  -ms-writing-mode: tb-rl;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;
  height: 50%;
  letter-spacing: 0.3em;
  display: flex;
  flex-flow: column;
}

.trimmed-wrapper span {
  padding: 0.3em;
}

.trimmed-wrapper span:nth-child(1) {
  z-index: 1;
  text-align: center;
  border-radius: 50%;
  letter-spacing: 0;
}

.trimmed-wrapper span:nth-child(2) {
  z-index: 2;
  margin-top: -0.9em;
  margin-bottom: -1.2em;
}

.trimmed-wrapper span:nth-child(3) {
  z-index: 1;
  text-align: center;
  border-radius: 50%;
  letter-spacing: 0;
}

.wrapper-content {
  border-radius: 4px;
  background: white;
}

#sokutore_button {
  border: 0.5px solid #3362a8;
  color: #3362a8;
  border-radius: 8px;
}

.is-size-8-sokutore {
  font-size: 0.5em;
  line-height: 6em;
}

.is-size-7-sokutore {
  line-height: 2.5em;
}

.is-size-6-sokutore {
  line-height: 1.8em;
}
</style>
