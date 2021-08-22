<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
html{
  background-color: #f5f7fa;
}
#app{
   font-family: Inter, sans-serif;
   background-color: #f5f7fa;
 }
 ::-webkit-scrollbar {
  width: 6px;
  background: #f5f7fa;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb {
  background: #4d4c4c;
  border-radius: 2px;
}
</style>
