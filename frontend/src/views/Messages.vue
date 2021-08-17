<template> 
  <div class="container">
    <Navbar /> 


    <div class="grid-message">
      <div class="message-users" id="scrool">

        <div v-for="(user, index) in users" @click="selectUser(index)" :key="user._id + index" :class="index == userSelect ? 'user selected' : 'user'">
          <div class="user-img">

          <img v-if="user.img == '' || user.img == undefined" src="/user.webp" alt="">
          <img v-else :src='`${hostServer}/images/clients/${user.img}`' alt="">

          </div><!-- user-img -->

          <div class="user-info">
            <div class="user-info-name">
              <p>{{user.name}}</p>
            </div><!-- user-info-name -->

            <div class="user-info-last-message">
              <p>...</p>
            </div><!-- user-info-last-message -->
          </div><!-- user-info -->
        </div> <!-- user -->

      </div><!-- message-users -->



      <div class="messages">
        <div class="messages-items">

          <div v-for="(message, index) in messages" :key="message._id + index" :class="message.from._id == myId ? 'message-item this' :'message-item reply'">
            <p>{{message.message}}</p>
          </div>

        </div>
        <div class="messages-send-messages">
          <div class="message-send-input">
            <input v-model="message" type="text" name="" id="" placeholder="Sua mensagem">
          </div><!-- message-send-input -->

          <div class="message-send-button">            
            <button  @click="sendMessage()">Enviar <i class="fas fa-paper-plane"></i></button>
          </div><!-- message-send-button -->


        </div><!-- messages-send-messages -->
      </div><!-- messages -->
    </div><!-- grid-message -->

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
  created() { 
    axios.get(`${hostServer}/me`, getHeader()).then(res => {
      this.myId = res.data[0]._id
    })

    this.updateMessages()

  }

}
</script>

<style scoped>
/* Estrutura geral */


.grid-message {
  width: 100%;
  display: grid;
  grid-template-columns: 5fr 8fr;
}

.grid-message .message-users {
  background: var(--primary-background);
  width: 100%;
  overflow-y: auto;
  height: calc(100vh - 50px);
  padding: 20px 0;
}

.grid-message .messages {
  background: var(--secundary-background);
  width: 100%;
  overflow-y: auto;
}
/* Fim Estrutura geral */

/*Usuário */
.user {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 20px;
}

.user.selected {
  background: var(--secundary-background);
}

.user .user-img {
  width: 50px;
  height: 50px;  
  margin-right: 10px;
}

.user .user-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.messages-items {
  overflow-y: auto;
  height: calc(100vh - 100px);
  padding: 0 10px;
}

.messages-send-messages {
  height: 50px;
  background: var(--primary-background);
}

.messages-items .message-item{
  margin: 10px 0;
  padding: 10px;
}

.messages-items .message-item.this {
  background: var(--primary-blue-color);
  margin-left: 50px;
  border-radius: 20px 0 20px 20px;
}

.messages-items .message-item.reply {
  background: var(--primary-background);
  margin-right: 50px;
  border-radius: 0 20px 20px 20px;
}


.messages-send-messages {
  display: flex;
  align-items: center;
  justify-content: center;
}

.message-send-input {
  width: 100%;
  padding: 0 5px 0 10px;
}

.message-send-input input {
  width: 100%;
  padding: 7px;
  outline: none;
  background: transparent;
  border: none;
}

.message-send-input input::placeholder {
  color: var(--secundary-text-color);
}


.message-send-button {
  padding: 0 10px 0 5px
}

.message-send-button button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  background: var(--primary-blue-color);
  outline: none;
  border: none;  
  cursor: pointer;
  border-radius: 10px;
}

.message-send-button button > i{
  font-size: 1.3rem;
  padding-left: 10px;
}


</style>
