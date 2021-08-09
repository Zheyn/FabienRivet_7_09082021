<template>
  <div class="container">
    <Header />
  </div>
</template>

<script>
  import Header from '../components/Header'

  export default {
    name: 'Home',

    components: {
      Header,
    },
  }
</script>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: 30% auto 30%
  }

</style>