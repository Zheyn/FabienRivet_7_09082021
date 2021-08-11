<template>
  <div class="container">
    <Header />
    <Accueil />
    <TextFields />
    <MenuMessage />
    <Wall />
    <Aside />
  </div>
</template>

<script>
  import Header from '../components/Header'
  import Aside from '../components/Aside'
  import Wall from '../components/Wall'
  import Accueil from '../components/Accueil'
  import TextFields from '../components/TextFields'
  import MenuMessage from '../components/MenuMessage'

  export default {
    name: 'Home',

    components: {
      Header, Aside, Wall, Accueil, TextFields, MenuMessage
        
    },
  }
</script>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: 30% auto 30%;
    grid-template-rows: 55px 150px 60px auto;
    padding: 0;
  }
  
</style>