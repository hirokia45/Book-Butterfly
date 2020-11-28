<template>
  <q-item
    clickable
    v-ripple
    link
    @click="updatePage(_id)"
  >
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label v-if="chapter" caption>{{ chapter }}</q-item-label>
      <q-item-label v-if="pageFrom || pageTo" caption>{{$t('page')}} {{pageFrom}} - {{ pageTo }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ['_id', 'title', 'chapter', 'pageFrom', 'pageTo'],
  methods: {
    updatePage(_id) {
      this.$emit('update-page', _id)
    },
  }
}
</script>
