<template>
    <div class="container_form_log">
        <Profilecomp />
    </div>
</template>

<script>
  import Profilecomp from '../components/Profilecomp'
  
  

  export default {
    name: 'Profile',

    components: {
      Profilecomp
        
    },
  }
</script>

<style scoped>
    .container_form_log{
        height: 100%;
    }
</style>