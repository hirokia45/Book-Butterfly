<template>
  <q-card class="note-card q-mb-md" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-bold">{{ userName }}</q-item-label>
        <q-item-label caption>
          {{ date }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section>
      <div class="text-bold">{{ title }}</div>
      <div class="text-caption">Author: {{ author }}</div>
      <p class="q-mb-none text-caption">Page: <span>{{ pageFrom }}</span>-<span>{{ pageTo }}</span></p>
      <div class="text-caption">Category: {{ category }}</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      {{ comment }}
    </q-card-section>

  </q-card>
</template>

<script>
export default {
  props: ['id', 'userName', 'date', 'title', 'author', 'pageFrom', 'pageTo', 'category', 'comment']
}
</script>
