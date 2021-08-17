<template> 
  <div class="message-container">
    <Navbar /> 
    <div class="users-message">
      <div class="users" id="scrool">
        <div v-for="(user, index) in users" @click="selectUser(index)" :key="user._id + index" :class="index == userSelect ? 'user selected' : 'user'">
          <div class="user-img">
            <img v-if="user.img == '' || user.img == undefined" src="/user.webp" alt="">
            <img v-else :src='`${hostServer}/images/clients/${user.img}`' alt="">
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
          <input class="input" v-model="message" type="text" name="" id="" placeholder="Sua mensagem">
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
// import io from 'socket.io-client';

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
      //socket: ''
    }
  },

  mounted() {
    //this.socket.on('MESSAGE', (data) => {
    //    console.log([...this.messages, data], 'xxxxxx')
    //});
  },
  methods: {
    sendMessage(){

      //this.socket.emit('SEND_MESSAGE', {
      //  message: this.message
      //});

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
    //this.socket = io(this.hostServer)
    axios.get(`${hostServer}/me`, getHeader()).then(res => {
      this.myId = res.data[0]._id
    })

    this.updateMessages()
  }
}
</script>

<style scoped>

.users-message {
  display: flex;
  flex: 1;
  background: var(--primary-background);;
}

.users {}

.user  {
  display: flex;
  width: 100%;
  background:  var(--primary-background);
  padding: 5px 20px;
  cursor: pointer;
}

.user.selected {
  background: var(--secundary-background);
}

.user-img {}

.user-img img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 5px;
}

.user-info {}
.user-info p {}

.messages {
  background: var(--primary-background);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: calc(100vh - 52px);
}

.message {
  flex: 1;
  padding: 0 10px;
  width: 100%;
  background: var(--secundary-background);
  overflow-y: auto;
}

.message-item {}

.message-item > p {
  width: 100%;
  word-break: break-all;
  padding: 10px;
  margin: 5px 0;
}

.message-item.this {
  background: var(--primary-background);
  margin-left: 20px;
  border-radius: 10px 10px 0 10px;
}

.message-item.reply {
  background: var(--primary-blue-color);
  margin-right: 20px;
  border-radius: 0px 10px 10px 10px;
}

.send-messages {
  height: 50px;
  width: 100%;
  background: var(--primary-background);;
  display: flex;
  padding: 5px;
}

.send-messages input {
  width: 100%;
  outline: none;
  padding: 0 10px;
  background: transparent;
  border: var(--border);
  margin-right: 5px;
  border-radius: 10px;
}

.send-messages button {
  display: flex;  
  background: var(--primary-blue-color);
  border: 0;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.send-messages button i {
  padding: 0 3px;
}

@media screen and (max-width: 600px){
  .user-info {
    display: none;
  }

}
</style>
