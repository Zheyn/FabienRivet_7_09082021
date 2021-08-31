<template>
  <div class="header">
    <nav class="header_link">
      <div class="header_link-all">
        <div class="header_icon"><i class="fas fa-home"></i></div>
        <div class="header_icon-text">
          <a href="" class="header_link-profil">Accueil</a>
        </div>
      </div>
      <div class="header_link-all">
        <div class="header_icon"><i class="fas fa-user"></i></div>
        <div class="header_icon-text">
          <router-link to="/Profile" class="header_link-profil"
            >Profil</router-link
          >
        </div>
      </div>
      <div v-if="getAdmin" class="header_link-all">
        <div class="header_icon"><i class="fas fa-tools"></i></div>
        <div class="header_icon-text">
          <router-link to="/Administration" class="header_link-profil"
            >Administration</router-link
          >
        </div>
      </div>
      <div class="header_link-all">
        <v-btn @click="disconnect()" text color="teal lighten-1">Déconnexion</v-btn>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    disconnect() {
      this.$store.commit("DISCONNECT");
      document.location.href = "/Start";
    },
  },
  computed: {
    ...mapGetters(["getAdmin"]),
  },
};
</script>

<style lang="scss">
.header {
  position: sticky;
  top: 0;
  grid-row: 1 / 5;
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  width: 100%;
  & .header_link-profil {
    display: block;
    width: 100%;
    font-size: 1.2rem;
    text-decoration: none;
    color: rgb(0, 0, 0);
  }
  & i {
    font-size: 1.6rem;
    color: rgb(0, 0, 0);
  }
  .header_link {
    width: 100%;
  }
  .header_link-all {
    display: flex;
    align-items: center;
    width: 80%;
    margin-top: 10%;
    padding: 5%;
    border-radius: 50px;
  }
  & .header_icon {
    display: flex;

    width: 20%;
  }
  & .header_link-post {
    display: flex;
    justify-content: center;
    width: 80%;
    padding-top: 30px;
  }
}
</style>
