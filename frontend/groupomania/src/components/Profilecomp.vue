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
      <v-btn color="primary"> Modifier </v-btn>
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
      <v-btn color="primary"> Modifier </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "",
      email: "",
    };
  },
  computed: {
    ...mapGetters(["getAdmin, getProfile"]),
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
</style>
