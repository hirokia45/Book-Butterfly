<script>
import ModalHeader from '../components/Modals/GeneralModalComponents/ModalHeader'
import ModalTitle from '../components/Modals/NoteModalComponents/ModalTitle'
import ModalAuthor from '../components/Modals/NoteModalComponents/ModalAuthor'
import ModalPages from '../components/Modals/NoteModalComponents/ModalPages'
import ModalChapter from '../components/Modals/NoteModalComponents/ModalChapter'
import ModalCategory from '../components/Modals/NoteModalComponents/ModalCategory'
import ModalButton from '../components/Modals/GeneralModalComponents/ModalButton'
import ModalComment from '../components/Modals/NoteModalComponents/ModalComment'

export default {
  components: {
    ModalHeader, ModalTitle, ModalAuthor, ModalPages, ModalChapter, ModalCategory, ModalComment, ModalButton
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
