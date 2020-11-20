<script>
export default {
  components: {
    ModalHeader: () => import('../components/Modals/GeneralModalComponents/ModalHeader'),
    ModalTitle: () => import('../components/Modals/NoteModalComponents/ModalTitle'),
    ModalAuthor: () => import('../components/Modals/NoteModalComponents/ModalAuthor'),
    ModalPages: () => import('../components/Modals/NoteModalComponents/ModalPages'),
    ModalChapter: () => import('../components/Modals/NoteModalComponents/ModalChapter'),
    ModalCategory: () => import('../components/Modals/NoteModalComponents/ModalCategory'),
    ModalComment: () => import('../components/Modals/NoteModalComponents/ModalComment'),
    ModalButton: () => import('../components/Modals/GeneralModalComponents/ModalButton')
  },
  methods: {
    submitForm() {
      this.$refs.modalTitle.$refs.title.validate()
      if (!this.$refs.modalTitle.$refs.title.hasError) {
        this.submitNote()
      }
    }
  }
}
</script>
