<template>
  <div class="coments">
    <div class="profile">
      <img src="/user.webp" alt="">
    </div><!-- profile -->
    <div class="msg-options">
      <div class="msg">
        <div class="msg-name-options">
          <p>Gabriel</p>
          <p>3 +</p>
          <p>Há 10 horas</p>
        </div><!-- msg-name-options -->

        <div class="msg-data">
          <p>Economista e cientista de dados em Uberlandia!</p>
        </div><!-- msg-data -->

        <div class="msg-body">
          <p> impressionante que briga política e a defesa de um político de estimação estão acima de notícias boas. Tem gente aí que se descobrirem a cura do câncer vão reclamar pq não foi a tempo de salvar fulano ou ciclano. A que ponto chegou o país. Essas pessoas não conseguem ver absolutamente nada de bom se não v 🤣🤣🤣</p>            
        </div><!-- msg-body -->
      </div><!-- msg -->

      <div class="options">
        <button>Curtir (10)</button>
      </div><!-- options -->
    </div><!-- msg-options -->
  </div><!-- coments -->
</template>

<script>
import { hostServer } from '../connections';

export default {
  name: 'Comment',
  data(){
    return {
      hostServer: hostServer
    } 
  }
}
</script>

<style scoped>
.coments {
  display: flex;
  margin-bottom: 9px;
}

.profile {
  margin-right: 15px;
  max-width: 50px;
  max-height: 50px;
}

.profile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.msg-options {
  width: 100%;
}


.msg {
  background: #3a3b3c;
  padding: 10px;
  width: 100%;
  border-radius: 0 5px 5px 5px;
}

.msg-name-options {
  display: flex;
}

/* Nome */
.msg-name-options p:nth-child(1){
  font-weight: 700;
}

/* Informações */
.msg-data p {
  font-size: 0.9rem;
  color: #c4c4c4;
}

.msg-body p {
  padding: 5px 0;
}




.options {
  width: 100%;
}

.options button {
  background: transparent;
  padding: 2px;
  border: 0;
  outline: none;
  cursor: pointer;
}

.options button:hover {
  color: var(--primary-blue-color);
} 
</style>

