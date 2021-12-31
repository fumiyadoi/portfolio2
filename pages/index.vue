<template>
  <section class="section">
    <div class="columns is-mobile center mt-5">
      <!-- firestoreにデータ追加するテストボタン -->
      <div class="column is-12">
        <Logo width="251" height="108" />
      </div>
    </div>
    <div class="columns is-mobile center mt-80">
      <div class="column is-12">
        <button @click="goSokudoku" class="button menu-button">速読</button>
      </div>
    </div>
    <div class="columns is-mobile center mt-4">
      <div class="column is-12">
        <button @click="goSokutore" class="button menu-button">速トレ</button>
      </div>
    </div>
    <div class="columns is-mobile center mt-4" v-bind:class="adminLinkActive">
      <div class="column is-12 has-text-centered"><span @click="goAdmin" style="text-decoration: underline;">ユーザー管理ページ</span></div>
    </div>
  </section>
</template>

<script>
import { db } from '../plugins/firebase.js'
import { doc, getDoc } from 'firebase/firestore'
import Logo from '~/assets/logo.svg'

export default {
  data () {
    return {
      adminLinkActive: 'is-hidden'
    }
  },
  components: {
    Logo
  },
  async mounted () {
    const docRef = await doc(db, 'users', this.$store.state.data.userId)
    const docSnap = await getDoc(docRef)
    console.log(docSnap.data())
    if (docSnap.data().admin) {
      this.adminLinkActive = ''
    }
  },
  methods: {
    goSokudoku () {
      this.$router.push('sokudoku-top')
    },
    goSokutore () {
      this.$router.push('sokutore-top')
    },
    goAdmin () {
      this.$router.push('userlist')
    }
  }
}
</script>

<style>
.center {
  text-align: center;
}

.menu-button {
  width: 343px;
  height: 80px;
  border: 1px solid #c9c8c7;
  border-radius: 8px;
  color: #3362a8;
  font-size: 28px;
  font-weight: bold;
  box-shadow: 0 2px 3px #00000029;
}

.mt-80 {
  margin-top: 80px;
}
</style>
