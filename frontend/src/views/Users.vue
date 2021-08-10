<template>
  <div class="home">
    <Navbar />

    <section>
      <div class="container">

        <h1>Usuários</h1>
        <table>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>

          <tr v-for="user in users" :key="user.id">
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
            <td>
              <button class="blue">View</button>
              <a class="green">View 2</a>
            </td>
          </tr>

        </table>  
      </div>
    </section>


  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';
import getHeader from '../getToken';


export default {
  name: 'Users',
  components: {
    Navbar
  },
  data() {
    return {
      users: []
    }
  },
   created() {
    axios.get('http://localhost:3333/users', getHeader()).then(users => {
      this.users = users.data
    })
  },  
}
</script>
