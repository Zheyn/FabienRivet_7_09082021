<template>
  <div class='header'>
    <nav class="header_link">
      <img src="/assets/grouporama.png" alt="" class="header_link-logo">
      <a href="" class="header_link-profil">Profil</a>
    </nav>
  </div>
</template>

<script>
  
</script>

<style scoped lang="scss">
  .header{
    display: flex;
    flex-direction: column;
    border: brown 1px solid;
    height: 100vh;
    width: 100%;
    text-align: end;
    padding-right: 20%;
    & a{
      font-size: 1.8rem;
      text-decoration: none;
      color: rgb(218, 218, 218);
    }
  }

</style>