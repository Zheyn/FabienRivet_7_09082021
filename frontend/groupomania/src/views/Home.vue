<template>
  <div class="container">
    <Header />
    <TextFields />
    <Wall />
  </div>
</template>

<script>
  import Header from '../components/Header'
  import Wall from '../components/Wall'
  import TextFields from '../components/TextFields'
  
  export default {
    name: 'Home',

    components: {
      Header, Wall, TextFields, 
        
    },
  }
</script>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: 20% 50%;
    grid-template-rows: 55px 150px 60px auto;
    padding: 0;
    background-color: #f5f7fa;
  }
  
</style>