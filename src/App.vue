<template>
  <div id="app">
    <router-view/>
  </div> 
</template>


<script>

export default {

  created() {
    // check for active theme
    let htmlElement = document.documentElement;
    let theme = localStorage.getItem("theme");

    if(theme === undefined) {
      this.themeSeleted = 'dark'
    } else {
      this.themeSeleted = theme
    }

    if (this.themeSeleted === 'dark') {
      htmlElement.setAttribute('theme', 'dark')
    } else if (this.themeSeleted === 'purple') {
      htmlElement.setAttribute('theme', 'purple');
    } else if(this.themeSeleted === 'light') {
      htmlElement.setAttribute('theme', 'light');
    }
  }
}

</script>
