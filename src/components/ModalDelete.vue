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

<style scoped>
.modal {
  position: fixed;
  background: var(--primary-nigth-shadow);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-item {
  max-width: 400px;
  background: var(--primary-background);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 5px 1px var(--primary-nigth-color);
}

.modal-item-title {
  width: 100%;
}

.modal-item-title p {
  padding-bottom: 10px;
  font-size: 1.7rem;
  width: 100%;
  text-align: center;
  font-weight: 700;
  color: var(--primary-text-color);
}

.modal-item-textarea p {
  background: transparent;
  width: 100%;
  padding: 10px;
  font-size: 1.1rem;
  color: var(--primary-text-color);
  outline: none;
  margin: 10px 0;
  resize: none;
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
  margin-bottom: 20px;
  cursor: pointer;
}

.modal-item-button button:nth-child(1) {
  background: var(--primary-blue-color);
  color: var(--primary-text-color);
  border: var(--border);
}

.modal-item-button button:nth-child(2) {
  background: var(--primary-background);
  color: var(--primary-text-color);
}

@media screen and (max-width: 600px) {
  .modal {
    padding: 5px;
  }
  
  .modal-item {
    margin: 0 10px;
    padding: 5px;
    width: 100%;
    max-width: 100%;
  }

  .modal-item-title p {
    padding: 0;
    margin: 0;
    padding-top: 20px;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .modal-item-textarea p {
    font-size: 1rem;
    font-weight: 500;
  }

  .modal-item-button button {
    font-size: 1rem;
  }
}
</style>