<template> 
      <section>
        <div class="titulo-principal">
          <a class="principal" href="/Home">Página Inicial</a>
          <router-link to="/Users">Usuários</router-link>
          <router-link to="/MyPosts">Meus Posts</router-link>
          <router-link to="/EditProfile">Editar Perfil</router-link>
        </div>
      </section>
</template>

<style>

.titulo-principal {
    max-width: 700px;
    width: 100%;
    padding: 10px 20px;
    margin: 0 auto;
    background-color: black;
    border: 1px solid #555;
    border-top: 0;
    border-bottom: none;
  }

  .titulo-principal a{
    text-decoration: none;
    padding-left: 10px;
    color: #ddd;

  }
  .titulo-principal .principal {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ddd;
    text-decoration: none;
  }

  .titulo-principal a.router-link-exact-active {
    text-decoration: underline;
    color: white;
  }
</style>
