<template>
  <div class="modal">
    <div class="modal-item">
      <div class="modal-item-title">
        <p>{{titleModal}}</p>

      </div><!-- modal-item-title -->

      <div class="modal-item-textarea">
        <textarea name="" id="" cols="30" rows="10" v-model="text"></textarea>
      </div><!-- modal-item-textarea -->

      <div class="modal-item-button">
        <button @click="cancelModal()">Voltar</button>
        <button>Salvar</button>
      </div><!-- modal-item-button -->
    </div><!-- modal-item -->
  </div><!-- modal -->
</template>


<script>
export default {
  name: 'Modal',
  data() {
    return {
        text: ''
    }
  },

  methods: {
    cancelModal() {
      this.$emit('cancelModel', '')
    },
    updateModal() {
      this.$emit('updateModel', {})
    }
  },

  created() {
    this.text = this.textModal;
  },

  props: {
    titleModal:String,
    textModal: String
  }
}
</script>
