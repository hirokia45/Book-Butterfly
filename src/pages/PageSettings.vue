<template>
  <q-page class="flex flex-center">
  <select v-model="selected">
    <option v-for="book in myBooks" :value="book" :key="book._id">
      {{ book.volumeInfo.title }}
    </option>
  </select>
  <p>
    {{ selected._id }}
  </p>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageBook',
    data(){
    return {
    inventory: [
      {name: 'MacBook Air', id: 1},
      {name: 'MacBook Pro', id: 2},
      {name: 'Lenovo W530', id: 3},
      {name: 'Acer Aspire One', id: 4}
    ],
    selected: {
        id: 2
    }
    }
  },
  computed: {
    ...mapGetters('books', ['myBooks'])
  }
}
</script>
