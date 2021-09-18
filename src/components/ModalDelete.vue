<template>
  <div v-if="show" class="modal">
    <div class="modal-item">
      <div class="modal-item-title">
        <p>Deletar conta</p>
      </div><!-- modal-item-title -->

      <div class="modal-item-textarea">
        <p>Deseja mesmo deletar todos os seus dados de forma irreversível, sem a possibilidade de recuperação? </p>
      </div><!-- modal-item-textarea -->

      <div class="modal-item-button">
        <button @click="cancelModal()">Cancelar</button>
        <button @click="updateModel()">Deletar Tudo</button>
      </div><!-- modal-item-button -->
    </div><!-- modal-item -->
  </div><!-- modal -->
</template>


<script>
export default {
  name: 'ModalDelete',
  data() {
    return {
    }
  },

  methods: {
    cancelModal() {
      this.$emit('cancelModel', '')
    },
    updateModel() {
      this.$emit('updateModel', {})
    }
  },

  created() {
  },

  props: {
    show: Boolean
  }
}
</script>
