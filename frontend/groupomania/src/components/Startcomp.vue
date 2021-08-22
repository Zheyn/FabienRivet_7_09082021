<template>
  <v-app>
    <div class="container_start d-flex flex-column">
      <div class="header_start d-flex justify-space-between">
        <div class="logo_link">
          <img class="logo" src="../assets/monoblack.png" alt="" />
        </div>
        <div class="link_start">
          <router-link to="/Login" class="link_btn">
            <v-btn depressed class="button_log-2"> Se connecter </v-btn>
          </router-link>
        </div>
      </div>
      <div class="container_mid d-flex align-center justify-center flex-column">
        <h1>Ici, c'est presque comme Twitter.</h1>
        <router-link to="/Register" class="link_btn">
          <v-btn depressed color="primary" class="button_log-1">
            Créer un compte
          </v-btn>
        </router-link>
      </div>
    </div>
  </v-app>
</template>

<script>
</script>

<style lang='scss' scoped>
.container_start {
  background-image: url("../assets/ahah.jpg");
  height: 100vh;
}
.container_mid {
  height: 100vh;
  transform: translateX(-350px);
  & h1 {
    transform: translateY(-40px);
    font-family: "Dancing Script", cursive;
    font-size: 2.5rem;
  }
}
.logo {
  width: 25%;
}
.v-application .justify-space-between {
  margin: 20px 20px 0 20px;
}
.button_log-2 {
  background-color: #e91e63 !important;
  color: azure !important;
}
.link_btn {
  text-decoration: none;
}
</style>
