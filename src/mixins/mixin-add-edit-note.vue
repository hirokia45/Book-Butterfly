<script>
import ModalHeader from '../components/Modals/ModalComponents/ModalHeader'
import ModalTitle from '../components/Modals/ModalComponents/ModalTitle'
import ModalAuthor from '../components/Modals/ModalComponents/ModalAuthor'
import ModalPages from '../components/Modals/ModalComponents/ModalPages'
import ModalCategory from '../components/Modals/ModalComponents/ModalCategory'
import ModalButton from '../components/Modals/ModalComponents/ModalButton'
import ModalComment from '../components/Modals/ModalComponents/ModalComment'

export default {
  components: {
    ModalHeader, ModalTitle, ModalAuthor, ModalPages, ModalCategory, ModalComment, ModalButton
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
