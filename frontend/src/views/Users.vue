<template>
  <div>
    <Navbar />
    <section>
      <div v-for="user in users" :key="user.id">
        <User :user="user"/>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';
import getHeader from '../getToken';
import User from '../components/User.vue'
import { hostServer } from '../connections';

export default {
  name: 'Users',
  components: {
    Navbar,
    User
  },
  data() {
    return {
      users: []
    }
  },
   created() {
    axios.get(`${hostServer}/users`, getHeader()).then(users => {
      this.users = users.data
    })
  },  
}
</script>
