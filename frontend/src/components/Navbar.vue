<template>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/CadastrarPost">CadastrarPost</router-link>
    </div>
</template>

<style>

#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
