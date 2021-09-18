<template> 
  <div class="message-container">
    <Navbar /> 
    <div class="users-message">
      <div class="users" id="scrool">
        <div v-for="(user, index) in users" @click="selectUser(index)" :key="user._id + index" :class="index == userSelect ? 'user selected' : 'user'">
          <div class="user-img">
            <img :src="$filters.processImg(user.img)" alt="">
          </div><!-- user-img -->
          <div class="user-info">
            <p>{{user.name}}</p>
            <p>...</p>
          </div><!-- user-info -->
        </div> <!-- user -->
      </div><!-- users -->

      <div class="messages">
        <div class="message">
          <div v-for="(message, index) in messages" :key="message._id + index" :class="message.from._id == myId ? 'message-item this' :'message-item reply'">
            <p>{{message.message}}</p>
          </div><!-- message-item -->
        </div><!-- message -->
 
        <div class="send-messages">
          <div class="input"><input v-model="message" type="text" placeholder="Sua mensagem"></div>
          <button  @click="sendMessage()">Enviar <i class="fas fa-paper-plane"></i></button>
        </div><!-- send-messages -->
      </div><!-- messages -->
    </div><!-- users-message -->
  </div><!-- container -->
</template>


<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';
import getHeader from '../getToken';
import { hostServer } from '../connections';


export default {
  name: 'Users',
  components: {
    Navbar
  },
  data() {
    return {
      users: [],
      hostServer: hostServer,
      userSelect: 0,
      messages: [],
      myId: '',
      message: '',
      idSendMesssage: ''
    }
  },
  mounted() {
  },
  methods: {
    sendMessage(){
      if (this.message != '') {
        axios.post(`${hostServer}/message`, {
          to: this.idSendMesssage,
          message: this.message
        }, getHeader()).then(() => {
          this.updateMessages()
          this.message = ''
        })
      }
    },
    selectUser(item) {
      this.userSelect = item;
      this.updateMessages()
    },
    updateMessages() {
      axios.get(`${hostServer}/messages/users`, getHeader()).then(res => {
        this.users = res.data;
        if (res.data.length != 0) { // Sem nenhuma mensagem
          this.idSendMesssage = res.data[this.userSelect]._id
          axios.get(`${hostServer}/message/${this.idSendMesssage}`, getHeader()).then(res2 => {
            this.messages = res2.data;
          })
        } else {
          this.idSendMesssage = -1;
          this.userSelect = -1;
        }
      })
    }
  },
  async created() { 
    axios.get(`${hostServer}/me`, getHeader()).then(res => {
      this.myId = res.data[0]._id
      this.updateMessages()
    })
  }
}
</script>


