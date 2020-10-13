<template>
  <q-page class="constrain" padding>

      <record-item
        v-for="record in records"
        :key="record.id"
        :id="record.id"
        :title="record.title"
        :category="record.category"
        :page="record.pages"
        :comment="record.comment"
        :timestamp="record.timestamps"
      >
        {{ record.title }}
      </record-item>

  </q-page>
</template>

<script>
import RecordItem from '../components/RecordItem'
export default {
  name: 'PageHome',
  components: {
    RecordItem
  },
  data() {
    return {
      records: [
        {
          id: 1,
          title: 'Harry Potter',
          author: 'someone',
          category: 'novel',
          pages: 150,
          comment: 'This is my comment section',
          timestamps: '2020/10/20 10:00 pm'
        },
        {
          id: 2,
          title: 'Alice in Wonderland',
          author: 'someone',
          category: 'novel',
          pages: 40,
          comment: 'This is my thoughts',
          timestamps: '2020/10/21 9:00 pm'
        }
      ]
    }
  }

}
</script>
