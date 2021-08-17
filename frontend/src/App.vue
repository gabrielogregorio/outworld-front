<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
:root { 
  --border-color: #470c8a;
  --border: 1px solid var(--border-color);


  --primary-blue-color: rgb(0, 89, 161);
  --primary-purple-color: rgb(137, 29, 199);
  --primary-orange-color: rgb(252, 148, 50);
  --primary-nigth-color: #3a3b3c;

  --primary-danger-color: rgba(255, 255, 255, 0.966);

  --background-body: #470c8a;
  --background-body-transparent: #ffffff;

  --primary-background: #008a7e;
  --secundary-background: #009c8f;
  --primary-text-color: #ffffff;
  --secundary-text-color: rgb(212, 212, 212);
}
 
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 500;
  color: var(--primary-text-color);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  min-height: 100vh;
  background-color: var(--background-body);
  overflow-y: scroll;
}

section {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
}

.form { 
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 100%;
  padding: 50px;
  margin: 0 auto;
  background-color: var(--primary-background);
  border: var(--border);
  border-top:0;
}

.form textarea {
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  background: transparent;
  outline: none;
  border: var(--border);
  resize: vertical;
  overflow-y: hidden;
  color: var(--primary-text-color);
}

.novo-post-imagem img{
  width: 100%;
}

form .novo-post-imagem img {
  width: 100%;
}

.form h1 {
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  color: var(--primary-text-color);
}

.form a {
  display: block;
  color: var(--primary-text-color);
  padding-top: 5px;
  padding-bottom: 5px;
}

.form label {
  display: block;
  color: var(--primary-text-color);
  padding-top: 20px;
  padding-bottom: 5px;
}

.form input {
  color: var(--primary-text-color);
  padding: 10px;
  background-color: transparent;
  outline: none;
  border: var(--border);
}

.form input::placeholder {
  color: var(--secundary-text-color);
}

.form button {
  display: block;
  margin: 10px 0;
  padding: 10px 0;
  cursor: pointer;
  background-color: var(--primary-blue-color);
  border: none;
  color: var(--primary-text-color);
  transition: 0.2s;
}

.form button:hover {
  background-color: var(--border-color);
}

.form button:hover {
  background-color: var(--primary-blue-color);
}

.form-logged {
  margin: 0 auto;
}

input[type="file"] {
  display: none;
}

.custom-file-upload {
  display: block;
  cursor: pointer;
}

.custom-file-upload i {
  display: block;
  cursor: pointer;
  font-size: 1.3rem;
  color: var(--secundary-color);
}
 
.input {
  width: 100%;
  background: linear-gradient(45deg, #470c8a, rgb(137, 29, 199));
  width: 100%;
  height: 100%;
  padding: 1px;
}

.input input {
  background: var(--primary-background);
  width: 100%;
  border: 3px solid transparent;
}

.input textarea {
  background: var(--primary-background);
  width: 100%;
  border: 3px solid transparent;
}

.form textarea::placeholder {
  color: var(--secundary-text-color);
}

.buttonDefault {
  border-radius: 20px;
    background: transparent;
  padding: 10px 20px;
  border: none;
  font-weight: 700;
  color: var(--primary-text-color);
  cursor: pointer;
  border: 1px solid var(--primary-text-color);
}

.activeButtonDefault {
  background: var(--background-body);
  border: 1px solid transparent;
}

.container {
  box-shadow: 0px 0px 19px -1px rgba(0,0,0,0.3);
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

img {
    box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.1);
}


/* Configurações de perfil */
.my-profile .name-config {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.my-profile .name-config h2 {
  font-size: 1.4rem;
  padding: 5px 0;
}

.my-profile .name-config i {
  font-size: 1.4rem;
  padding: 5px 10px;
  cursor: pointer;
  transition: 0.2s;
} 

.name-config  > a > i:hover {
  color: var(--background-body);
}

.bio-and-work {
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.statistics {
}

.citation {
  width: 100%;
  padding: 20px 10px;
  text-align: center;
}

/* Perfil de imagem */
.my-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  width: 100%;
  padding: 10px 30px;
  margin: 0 auto;
  background-color: var(--primary-background);
  border: var(--border);
  border-top: 0;
  padding-bottom: 0;
}

.my-profile img {
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 50%;
}

/* Fim de imagem */

/* Opções Posts e Amigos */
.menu-items {
  width: 100%;
  display: flex;
  padding-top: 20px;
}

.menu-items button {
  display: block;
  flex: 1;
  background: transparent;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.menu-items button:hover {
  font-weight: 700;
  border-bottom: 2px solid var(--border-color);
} 
</style>
