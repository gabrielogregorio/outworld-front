<template>
  <div class="newComment">
    <div class="profile">
      <img src="/user.webp" alt="">
    </div><!-- profile -->

    <div class="comment">
      <textarea type="text" name="" id=""></textarea>
    </div><!-- comment -->
  </div>
</template>

<script>
export default {
  name: 'MakeComment'
}
</script>


<style scoped>

.newComment {
  display: flex;
  align-content: center;
  width: 100%;
  margin: 10px 0;
}

.profile {
  margin-right: 15px;
  max-width: 50px;
  max-height: 50px;
}

.profile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.comment {
  width: 100%;
  display: flex;
  justify-content: center;
}

.comment textarea {
  width: 100%;
  padding:  0.2rem 10px;
  font-size: 1.2rem;
  height: auto;
  background: transparent;
  outline: none;
  overflow: hidden;
  border-radius: 20px;
  border: var(--border);
}

</style>