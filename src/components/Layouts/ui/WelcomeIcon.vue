<template>
  <div class="col-6 col-sm-3 text-center q-mb-md">
    <q-avatar
      font-size="52px"
      :icon="icon"
      size="100px"
      text-color="white"
      class="shadow-3 q-mb-md"
      :class="bgColor"
    />
    <div class="row justify-center">
      <q-card
        class="shadow-1"
        style="width: 90%"
        flat
        bordered
      >
        <q-card-section class="text-subtitle text-bold q-pa-sm">{{ title }}</q-card-section>
        <q-card-section class="text-caption q-px-sm q-pb-sm q-pt-none">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas, eligendi. Possimus hic harum, ipsam pariatur ex a. Earum consequatur delectus vitae cumque debitis expedita ab officia, itaque architecto adipisci quam.</q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  props: ['icon','bgColor', 'title']
}
</script>
