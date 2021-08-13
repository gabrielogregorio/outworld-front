<template> 
  <section>
    <div class="titulo-principal">
      <nav>
        <div class="principal"><router-link to="/Home">Página Inicial</router-link></div>
        <div><router-link to="/Users">Usuários</router-link></div>
        <div class="perfil"><router-link to="/MyProfile">Perfil</router-link></div>
      </nav>
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

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: auto;
    padding: 10px 0;
  }

  nav div.principal a{
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--primary-text-color);
  }

  nav div a{
    padding: 4px 10px;
    color: var(--secundary-text-color)
  }
  nav div a.router-link-exact-active {
    text-decoration: underline;
    font-weight: 700;
  }

  nav div.perfil {
    flex: 1;
    text-align: right;
  }
</style>
