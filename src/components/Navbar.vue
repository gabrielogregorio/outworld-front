<template> 
  <section> 
    <div class="menu-principal">
      <nav>
        <div><router-link to='/Home'><i class="fas fa-home"></i></router-link></div>
        <div><router-link to="/Users"><i class="fas fa-users"></i></router-link></div>
        <div><router-link :to="{path: '/Save', query: {archive: true}}"><i class="fas fa-archive"></i></router-link></div>
        <div><router-link to="/Messages"><i class="fas fa-comments"></i></router-link></div>

        <div class="perfil"><router-link to="/Profile"><i class="fas fa-user"></i></router-link></div>
      </nav>
    </div><!-- menu-principal -->
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
