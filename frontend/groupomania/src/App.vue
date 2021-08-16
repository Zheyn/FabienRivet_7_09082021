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

#app{
   font-family: Inter, sans-serif;
   background-color: rgb(21, 32, 43);
 }
 ::-webkit-scrollbar {
  width: 6px;
  background: rgb(33, 49, 65);
  border-radius: 2px;
}
::-webkit-scrollbar-thumb {
  background: rgb(57, 83, 110);
  border-radius: 2px;
}
</style>
