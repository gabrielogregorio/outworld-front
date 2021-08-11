<template>
  <section>
    <div class="form">
      <h1>Criar conta</h1>

      <label for="name">Seu nome </label>
      <input type="name" name="name" id="name" placeholder="Seu nome" v-model="name">

      <label for="image">Sua foto</label>
      <input type="file" name="image" id="image">

      <label for="email">E-mail: </label>
      <input type="email" name="email" id="email" placeholder="Seu e-mail" v-model="email">

      <label for="password">Password: </label>
      <input type="password" name="password" id="password" placeholder="Uma senha" v-model="password">
      
      <a href="/Login">Fazer login</a>
      <button @click="cadastrar()">Login</button><br>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterUser',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },

  methods: {
    cadastrar() {

    //Form data para enviar o arquivo
    const formData = new FormData();
    const image = document.querySelector("#image");

    formData.append("image", image.files[0]);
    formData.append("name", this.name);
    formData.append("email", this.email,);
    formData.append("password", this.password);

    var headers  = {"Content-Type": `multipart/form-data; boundary=${formData._boundary}`}
      axios.post("http://localhost:3333/user", formData, { headers }).then(res => {
        localStorage.setItem('token', res.data.token)
        this.$router.push({name: 'Home'})
      }).catch(error => {
        console.log(`Erro ao registrar dados: ${error}`);
      })
    }
  }
}
</script>
