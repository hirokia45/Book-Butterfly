import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Quasar } from 'quasar'

import messages from 'src/i18n'

Vue.use(VueI18n)

const qLocale = Quasar.lang.getLocale()
const lang = JSON.parse(localStorage.getItem("lang"))

const i18n = new VueI18n({
  locale: lang || qLocale,
  fallbackLocale: 'en-us',
  messages
})

export default ({ app }) => {
  app.i18n = i18n
}

export { i18n }
