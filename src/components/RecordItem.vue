<template>
  <q-card class="my-card q-mb-md">
    <q-card-section>
      <div>{{ timestamps }}</div>
      <div>{{ title }}</div>
      <p>{{ category }} {{ page }}</p>
      <div>{{ comment }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ['title', 'category', 'page', 'comment', 'timestamps']
}
</script>
