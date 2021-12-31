export const state = () => ({
  fontsize: 'medium',
  bookId: undefined,
  bookPages: {},
  sokudokuSpeed: 50,
  sokutoreSpeed: 50,
  flag: false, /* 教材編集時の文章表示判断用 */
  userId: '',
  email: '',
  emailTmp: '',
  emailAtLogin: '',
  password: '',
  backIdentifier: 'sokudoku-top',
  userInfoId: '',
  stopRedirect: false
})

export const mutations = {
  tmp: function (state) {
    state.bookId = undefined
    state.bookPages = {}
  },
  addBook: function (state, id) {
    state.bookPages[id] = [0, 0]
  },
  deleteBook: function (state, id) {
    delete state.bookPages[id]
  },
  changeBookId: function (state, id) {
    state.bookId = id
  },
  changePage: function (state, i) {
    if (i === 0) {
      state.bookPages[state.bookId][i] += 1
    } else {
      state.bookPages[state.bookId][i] += 3
    }
  },
  goTopPage: function (state, i) {
    state.bookPages[state.bookId][i] = 0
  },
  changeSokudokuSpeed: function (state, speed) {
    state.sokudokuSpeed = speed
  },
  changeSokutoreSpeed: function (state, speed) {
    state.sokutoreSpeed = speed
  },
  changeIndetifier: function (state, tmp) {
    state.backIdentifier = tmp
  },
  fontsizeSmall: function (state) {
    state.fontsize = 'small'
    console.log(state.fontsize)
  },
  fontsizeMedium: function (state) {
    state.fontsize = 'medium'
    console.log(state.fontsize)
  },
  fontsizeLarge: function (state) {
    state.fontsize = 'large'
    console.log(state.fontsize)
  },
  falseFlag: function (state) {
    state.flag = false
  },
  trueFlag: function (state) {
    state.flag = true
  },
  setUserId: function (state, id) {
    state.userId = id
  },
  setEmail: function (state, mail) {
    state.email = mail
  },
  setEmailTmp: function (state, mail) {
    state.emailTmp = mail
  },
  setEmailAtLogin: function (state, emailAtLogin) {
    state.emailAtLogin = emailAtLogin
  },
  setPassword: function (state, password) {
    state.password = password
  },
  setUserInfoId: function (state, id) {
    state.userInfoId = id
  },
  toggleRedirect: function (state, boolean) {
    state.stopRedirect = boolean
  }
}
