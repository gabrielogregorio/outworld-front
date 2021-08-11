<template> 
  <div class="container-user">
    <div class="img-user-perfil">
      <img v-if="user.img == ''" src="/user.webp" alt="">
      <img v-else :src='`${hostServer}/images/clients/${user.img}`' alt="">

    </div>

    <div class="info-user">
      <div class="info-user-perfil">
        <div class="info-user-superior">
          <h2>{{user.name}}</h2>
          <p class="info-username">@user</p>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import { hostServer } from '../connections';

export default {
  name: 'User',
  components: {},
  data() {
    return {
      hostServer: hostServer
    }
  },
   created() {
  },  
  props: {
    user: Object
  },
  methods: {}
}
</script>

<style scoped>

div.container-user {
  display: flex;
  max-width: 700px;
  width: 100%;
  padding: 10px;
  margin: 0 auto;
  background-color: var(--primary-background);
  border: var(--border);
  border-top: 0;
}


.img-user-perfil {
  margin-right: 15px;
  max-width: 50px;
  max-height: 50px;
}

.img-user-perfil img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info-user {
  width: 100%;
}

.info-user-perfil {
  width: 100%;
}

.info-user-superior {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.info-user-superior h2 {
  font-weight: 700;
  color: white;
  font-size: 1rem;
}

.info-user-superior .info-username {
  font-weight: 700;
  flex: 1;
  margin-left: 5px;
  font-size: 1rem;
}

</style>