<template>
    <div class="container_form_log">
        <Formlog />
    </div>
</template>

<script>
  import Formlog from '../components/Formlog'
  
  

  export default {
    name: 'Login',

    components: {
      Formlog 
        
    },
  }
</script>

<style scoped>
    .container_form_log{
        height: 100%;
    }
</style>