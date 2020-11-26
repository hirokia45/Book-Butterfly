import Vue from 'vue'
import VueI18n from 'vue-i18n'

import messages from 'src/i18n'

Vue.use(VueI18n)

const lang = JSON.parse(localStorage.getItem("lang"))

const i18n = new VueI18n({
  locale: lang || 'en-us',
  fallbackLocale: 'en-us',
  messages
})

export default ({ app }) => {
  app.i18n = i18n
}

export { i18n }
