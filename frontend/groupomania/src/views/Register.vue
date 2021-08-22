<template>
    <div class="container_form_log">
        <FormRegister />
    </div>
</template>

<script>
  import FormRegister from '../components/FormRegister'
  
  

  export default {
    name: 'Register',

    components: {
      FormRegister 
        
    },
  }
</script>

<style scoped>
    .container_form_log{
        height: 100%;
    }
</style>