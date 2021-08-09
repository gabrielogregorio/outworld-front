<template>
  <div class="home">
    <Navbar />


    <section>
      <div class="container">

        <h1>usuarios e fotos</h1>
        <table>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>Ações</th>
          </tr>

          <tr>
            <td>2</td>
            <td>lisa@google.com</td>
            <td>
              <button class="blue">View</button>
              <a class="green">View 2</a>
            </td>
          </tr>

        </table>  
      </div>
    </section>


  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>
