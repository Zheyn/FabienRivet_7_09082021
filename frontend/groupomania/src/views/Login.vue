<template>
    <div class="container_form_log">
        <FormLogin />
    </div>
</template>

<script>
  import FormLogin from '../components/FormLogin'
  
  

  export default {
    name: 'Login',

    components: {
      FormLogin
        
    },
  }
</script>

<style scoped>
    .container_form_log{
        height: 100%;
    }
</style>