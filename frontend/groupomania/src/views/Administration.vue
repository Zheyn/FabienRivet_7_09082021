<template>
    <div class="container_form_log">
        <Admincomp />
    </div>
</template>

<script>
  import Admincomp from '../components/Admincomp'
  
  

  export default {
    name: 'Administration',

    components: {
      Admincomp
        
    },
  }
</script>

<style scoped>
    .container_form_log{
        height: 100%;
    }
</style>