<template>
  <div class="container d-flex flex-column align-center justify-center">
    <h1 class="profile_name">
      Bonjour <span class="name">{{ $store.state.username }}</span>
    </h1>
    <img class="img_avatar" src="../assets/avatar.jpg" alt="" />
    <p v-if="getAdmin" class="badge_user">Vous êtes un administrateur !</p>
    <p v-if="!getAdmin" class="badge_user">Vous êtes sur la bonne voie !</p>
    <div class="modify_username d-flex align-center justify-center">
      <p>Modifier votre nom d'utilisateur</p>
      <v-textarea
        v-model="username"
        auto-grow
        outlined
        rows="1"
        row-height="15"
      ></v-textarea>
      <v-btn @click="modifyUsername()" color="primary"> Modifier </v-btn>
    </div>
    <div class="modify_email d-flex align-center">
      <p>Modifier votre adresse email</p>
      <v-textarea
        v-model="email"
        auto-grow
        outlined
        rows="1"
        row-height="15"
      ></v-textarea>
      <v-btn @click="modifyEmail()" color="primary"> Modifier </v-btn>
    </div>


    <v-btn
      @click="alert()"
      v-if="noAlert"
      depressed
      color="error"
    >
      Supprimer le compte
    </v-btn>
    <v-alert
      v-if="alertProfil"
      prominent
      type="error"
    >
      <v-row align="center">
        <v-col class="grow">
          La suppression du compte est définitive
        </v-col>
        <v-col class="shrink d-flex">
          <v-btn @click="destroyUser()" class="btn_alert">Passez à l'action</v-btn>
          <router-link to="Home" class="btn_home">
          <v-btn color="green darken-2">Finalement je reste</v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-alert>



  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "",
      email: "",
      alertProfil: false,
      noAlert: true
    };
  },
  methods: {
    alert() {
      this.alertProfil = true,
      this.noAlert = false
    },
    modifyUsername() {
      let valueForm = {
        username: this.username,
      };
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", 
                   Authorization: "Bearer " + this.$store.getters.getToken,
                 },
        body: JSON.stringify(valueForm),
      };
      fetch("http://localhost:3000/api/auth/modify/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.$store.commit('ADD_PROFILE', data);
          console.log('updateUser', data);
        });
    },
    modifyEmail() {
      let valueForm = {
        email: this.email,
      };
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", 
                   Authorization: "Bearer " + this.$store.getters.getToken,
                 },
        body: JSON.stringify(valueForm),
      };
      fetch("http://localhost:3000/api/auth/modify/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.$store.commit('ADD_PROFILE', data);
          console.log(data);
        });
    },
    destroyUser() {
      
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json", 
                   Authorization: "Bearer " + this.$store.getters.getToken,
                 },
      };
      fetch("http://localhost:3000/api/auth/destroy/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          document.location.href = "/";
          console.log(data);
        });
    },
  },
  computed: {
    ...mapGetters(["getAdmin"]),
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  transform: translateX(-50%);
  transform: translateY(-20%);
}
.img_avatar {
  width: 10%;
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 20px;
  box-shadow: 0px 0px 24px -4px rgba(0, 0, 0, 0.15);
}
.profile_name {
  margin-bottom: 20px;
  & .name {
    color: rgb(34, 82, 97);
  }
}
.btn_alert{
  margin-right: 10px;
}
.btn_home{
  text-decoration: none;
}
</style>
