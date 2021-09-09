<template>
  <div class="container">
    <Header />
    <Wall />
  </div>
</template>

<script>
import Header from "../components/Header";
import Wall from "../components/Wall";

export default {
  name: "Home",

  components: {
    Header,
    Wall,
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 20% 50%;
  padding: 0;
  background-color: #f5f7fa;
}
</style>