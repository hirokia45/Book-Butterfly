<template>
  <div>
    <q-circular-progress
      show-value
      :value="circleValue"
      size="90px"
      :thickness="0.2"
      :min="min"
      :max="max"
      color="primary"
      track-color="grey-3"
      class="q-ma-md"
    >
      <template>
        <div v-if="circleValue" class="text-subtitle1">{{circleValue}}</div>
        <div v-else class="text-subtitle1">0</div>
      </template>
      /
      <template>
        <div v-if="circleValue" class="text-subtitle1">{{max}}</div>
        <div v-else-if="!circleValue && tab === 'note'" class="text-subtitle1">20</div>
        <div v-else-if="!circleValue && tab === 'book'" class="text-subtitle1">5</div>
        <div v-if="circleValue && tab === 'note' && circleValue >= 100" class="text-subtitle1">
          <q-icon name="all_inclusive" style="font-size: 1em" />
        </div>
        <div v-if="circleValue && tab === 'book' && circleValue >= 30" class="text-subtitle1">
          <q-icon name="all_inclusive" style="font-size: 1em" />
        </div>
      </template>
    </q-circular-progress>
  </div>
</template>

<script>
export default {
  props: ['tab', 'totalNotes', 'totalBooksCompleted'],
  data() {
    return {

    }
  },
  computed: {
    circleValue() {
      return this.totalNotes || this.totalBooksCompleted
    },
    min() {
      if (this.totalNotes) {
        if (this.totalNotes < 20) {
          return 0
        } else if (this.totalNotes < 50) {
          return 20
        } else if (this.totalNotes < 100) {
          return 50
        }
      } else if (this.totalBooksCompleted) {
        if (this.totalBooksCompleted < 5) {
          return 0
        } else if (this.totalBooksCompleted < 15) {
          return 5
        } else if (this.totalBooksCompleted < 30) {
          return 15
        }
      }
    },
    max() {
      if (this.totalNotes) {
        if (this.totalNotes < 20) {
          return 20
        } else if (this.totalNotes < 50) {
          return 50
        } else if (this.totalNotes < 100) {
          return 100
        }
      } else if (this.totalBooksCompleted) {
        if (this.totalBooksCompleted < 5) {
          return 5
        } else if (this.totalBooksCompleted < 15) {
          return 15
        } else if (this.totalBooksCompleted < 30) {
          return 30
        }
      }
    }
  }
}
</script>
