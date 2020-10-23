<template>
  <q-item
    clickable
    v-ripple
    link
    @click="updatePage(_id)"
  >
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>Pages {{pageFrom}} - {{ pageTo }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ['_id', 'title', 'pageFrom', 'pageTo'],
  methods: {
    updatePage(_id) {
      this.$emit('update-page', _id)
    },
  }
}
</script>
