<template>
  <div class="container">
    <Header />
    <h1>Accueil</h1>
    <Wall />
    <Aside />
  </div>
</template>

<script>
  import Header from '../components/Header'
  import Aside from '../components/Aside'
  import Wall from '../components/Wall'

  export default {
    name: 'Home',

    components: {
      Header, Aside, Wall,
    },
  }
</script>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: 30% auto 30%;
    grid-template-rows: 55px auto;
  }
  h1{
    color: rgb(218, 218, 218);
    border-bottom: .5px solid rgb(218, 218, 218);
    border-left: .5px solid rgb(218, 218, 218);
    border-right: .5px solid rgb(218, 218, 218);
    font-size: 1.3em;
    padding: 15px 0 0 15px;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    position: sticky;
    top: 0;
    z-index: 1;
  }
</style>