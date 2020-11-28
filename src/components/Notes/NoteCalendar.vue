<template>
  <calendar
    :attributes="attributes"
  >
    <div
      slot="day-popover" slot-scope="{ day, dayTitle, attributes }">
        <div class="text-xs text-gray-300 font-semibold text-center">
          {{ dayTitle }}
        </div>
        <popover-row
          v-for="attr in attributes"
          :key="attr.key"
          :attribute="attr"
        >
          <div @click="toSingleNotePage(attr.customData._id)" class="cursor-pointer">
            <div class="popover-row-item">{{ attr.customData.title }}</div>
            <div v-if="attr.customData.pageFrom || attr.customData.pageTo" class="text-weight-thin">{{$t('page')}}: {{ attr.customData.pageFrom}} - {{ attr.customData.pageTo }}</div>
          </div>
        </popover-row>
    </div>
  </calendar>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Calendar: () => import('v-calendar/lib/components/calendar.umd'),
    DatePicker: () => import('v-calendar/lib/components/date-picker.umd'),
    PopOver: () => import('v-calendar/lib/components/popover.umd'),
    PopoverRow: () => import('v-calendar/lib/components/popover-row.umd')
  },
  computed: {
    ...mapGetters('notes', ['calendarInfo']),
    attributes() {
      return [
        ...this.calendarInfo.map(info => ({
          key: info._id,
          dates: info.createdAt,
          highlight: {
            color: 'orange',
            class: 'primary-gradient-background',
            fillMode: 'solid'
          },
          popover: {
            visibility: 'hover'
          },
          customData: info
        }))
      ]
    }
  },
  methods: {
    toSingleNotePage(_id) {
      this.$router.push(`/notes/${_id}`)
    },
  },
}
</script>

<style lang="sass" scoped>
.popover-row-item
  display: flex
  flex-wrap: wrap

.popover-row-item::after
  content: ''
  width: 100%
</style>
