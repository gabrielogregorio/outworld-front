<template> 
  <section>
    <div class="titulo-principal">
      <a class="principal" href="/Home">Página Inicial</a>
      <router-link to="/Users">Usuários</router-link>
      <router-link to="/MyPosts">Meus Posts</router-link>
      <router-link to="/EditProfile">Editar Perfil</router-link>
    </div><!-- titulo-principal -->
  </section>
</template>

<style>

.titulo-principal {
    max-width: 700px;
    width: 100%;
    padding: 10px 20px;
    margin: 0 auto;
    background-color: var(--primary-background);
    border: var(--border);
    border-top: 0;
  }

  .titulo-principal .principal {
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--primary-text-color);
  }

  .titulo-principal a{
    text-decoration: none;
    padding: 4px 10px;
    color: var(--secundary-text-color)

  }
  .titulo-principal a.router-link-exact-active {
    text-decoration: underline;
    font-weight: 700;
  }
</style>
