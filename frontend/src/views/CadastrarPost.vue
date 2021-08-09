<template>
  <div>
    <Navbar />
    <h1>This is an about page</h1>
    <section>
      <div class="container">

        <label for="textarea">Conteudo do post</label>
        <textarea name="textarea" id="textarea" cols="30" rows="8" v-model="conteudo"></textarea>

        <!--<label for="avatar">Adicionar uma imagem</label>
        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg, image/jpg">-->
        
        <button>Postar</button><br>

      </div>
    </section>
  </div>
</template>


<script>

import Navbar from '../components/Navbar.vue';

export default {
  name: 'CadastrarPost',
  components: {
    Navbar
  },
  data() {
    return {
      conteudo: 'wsddsdsdsdssewe',
      imagem: ''
    }
  },
  methods: {

  }
}


</script>
