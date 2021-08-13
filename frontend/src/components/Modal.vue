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

<style scoped>
.modal {
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-item {
  background: var(--primary-background);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 5px 1px #111;
}

.modal-item-title {
  width: 100%;
}

.modal-item-title p{
  font-size: 2rem;
  width: 100%;
  font-weight: 700;
  text-align: left;
  color: white;
}

.modal-item textarea {
  background: transparent;
  width: 100%;
  padding: 10px;
  font-size: 1.1rem;
  color: white;
  outline: none;
  margin: 10px 0;
  resize: none;
  border: var(--border);
}

.modal-item-button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-item-button button {
  padding: 10px 30px;
  border-radius: 40px;
  margin: 0 10px;
  cursor: pointer;
}

.modal-item-button button:nth-child(1) {
  background: var(--primary-background);
  color: white;
  border: var(--border);
}

.modal-item-button button:nth-child(2) {
  background: var(--primary-blue-color);
  border: var(--border);
  color: white;
}
</style>
