<template>
  <div>
    <div class="row justify-center panel-size q-pb-none">
      <the-progress-circle
        :totalNotes="totalNotes"
        :totalBooksCompleted="totalBooksCompleted"
        :tab="tab"
      />

      <div class="q-pa-sm">
        <template v-if="tab === 'note'">
          <template>
            <template v-if="totalNotes">
              <div class="text-caption">{{$t('youHaveWritten')}}</div>
              <div class="text-h6 text-center">{{totalNotes}} {{$t('noteTotal')}}</div>
            </template>
            <template v-else>
              <div class="text-center">{{$t('youHaveNotWritten1')}}</div>
              <div class="text-center">{{$t('youHaveNotWritten2')}}</div>
            </template>
          </template>

          <div class="row justify-center">
            <q-avatar square align="center" size="55px">
            <img src="../../assets/notes.png">
            </q-avatar>
          </div>
        </template>

        <template v-if="tab === 'book'">
          <template>
            <template v-if="totalBooksCompleted">
              <div class="text-caption">{{$t('youHaveRead')}}</div>
              <div class="text-h6 text-center">{{totalBooksCompleted}} {{$t('bookTotal')}}</div>
            </template>
            <template v-else>
              <div class="text-center">{{$t('youHaveNotRead1')}}</div>
              <div class="text-center">{{$t('youHaveNotRead2')}}</div>
            </template>
          </template>

          <div class="row justify-center">
            <q-avatar square align="center" size="55px">
            <img src="../../assets/books.png">
            </q-avatar>
          </div>
        </template>
      </div>
    </div>

    <div class="row justify-center q-gutter-md">
      <div>
        <q-avatar
          :text-color="totalNotes >= 100 || totalBooksCompleted >= 30 ? 'yellow-6' : 'grey-2'"
          font-size="50px"
          icon="emoji_events"
        />
      </div>
      <div>
        <q-avatar
          :text-color="totalNotes >= 50 || totalBooksCompleted >= 15 ? 'grey-5' : 'grey-2'"
          font-size="50px"
          icon="emoji_events"
        />
      </div>
      <div>
        <q-avatar
          :text-color="totalNotes >= 20 || totalBooksCompleted >= 5 ? 'orange-7' : 'grey-2'"
          font-size="50px"
          icon="emoji_events"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {
    TheProgressCircle: () => import('./TheProgressCircle')
  },
  props: ['tab', 'totalNotes', 'totalBooksCompleted'],
  methods: {
    ...mapActions('books', ['getTotalItemCounts'])
  },
  created() {
    this.getTotalItemCounts()
  }
}
</script>

<style lang="sass" scoped>
.panel-size
  width: 285px
</style>
