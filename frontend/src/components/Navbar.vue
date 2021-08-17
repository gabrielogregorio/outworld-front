<template> 
  <section> 
    <div class="titulo-principal">
      <nav>
        <div><router-link to='/Home'><i class="fas fa-home"></i></router-link></div>
        <div><router-link to="/Users"><i class="fas fa-users"></i></router-link></div>
        <div><router-link :to="{path: '/Home', query: {archive: true}}"><i class="fas fa-archive"></i></router-link></div>
        <div><router-link to="/Messages"><i class="fas fa-comments"></i></router-link></div>

        <div class="perfil"><router-link to="/Profile"><i class="fas fa-user"></i></router-link></div>
      </nav>
    </div><!-- titulo-principal -->
  </section>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    updatePosts() {
      this.$emit("updatePosts", "")
    }
  }
}
</script>


<style>
.titulo-principal {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  border: var(--border);
  border-top: 0;
}

nav {
  background-color: var(--primary-background);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  padding: 0 30px;
}


nav div a{
  color: var(--secundary-text-color);
  text-transform: uppercase;

}

nav div i{
  font-size: 1.3rem;
    padding: 15px;
}

nav div a.router-link-exact-active i {
  color: var(--background-body);
  border-bottom: 2px solid var(--background-body);
}

nav div.perfil {
  flex: 1;
  text-align: right;
}
</style>
