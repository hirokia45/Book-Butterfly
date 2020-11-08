<template>
  <div class="row q-mb-sm">
    <q-input
      type="number"
      class="col-5"
      outlined
      clearable
      :value="pageFrom"
      @input="$emit('update:pageFrom', $event)"
      label="From" />
    <q-space />
    <span></span>
    <q-input
      type="number"
      class="col-5"
      outlined
      clearable
      :value="pageTo"
      @input="$emit('update:pageTo', $event)"
      label="To" />
  </div>
</template>

<script>
export default {
  props: ['pageFrom', 'pageTo']
}
</script>
