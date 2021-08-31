<template>
  <div class="container d-flex flex-column align-center justify-center">
    <router-link to="Home" class="btn_home align-self-start">
      <v-btn class="ma-2" text color="light-green darken-2" dark>
        <v-icon dark left> mdi-arrow-left </v-icon>Retour
      </v-btn>
    </router-link>
    <h1 class="profile_name">
      Hello, <span class="name">{{ $store.state.username }}</span>
    </h1>
    <img class="img_avatar" src="../assets/72.png" alt="" />
    <p v-if="getAdmin" class="badge_user">Administrateur</p>
    <p v-if="!getAdmin" class="badge_user">Recrue</p>
    <div class="container-modify d-flex justify-space-around">
      <div class="modify_username d-flex flex-column">
        <p class="title-modify">Modifier votre nom d'utilisateur</p>
        <v-text-field
          :label="getProfile"
          clearable
          :rules="nameRules"
          v-model="username"
        ></v-text-field>
        <v-btn v-if="username" @click="modifyUsername()" color="primary">
          Modifier
        </v-btn>
      </div>
      <div class="modify_email d-flex flex-column">
        <p class="title-modify">Modifier votre adresse email</p>
        <v-text-field
          :label="getEmail"
          clearable
          :rules="emailRules"
          v-model="email"
        ></v-text-field>
        <v-btn v-if="email" @click="modifyEmail()" color="primary">
          Modifier
        </v-btn>
      </div>
    </div>

    <v-btn
      plain
      text
      @click="alert()"
      v-if="noAlert"
      depressed
      color="error"
      class="btn-delete"
    >
      Supprimer le compte
    </v-btn>
    <v-alert v-if="alertProfil" prominent type="error" class="container-alert">
      <v-row align="center">
        <v-col class="grow"> La suppression du compte est définitive </v-col>
        <v-col class="shrink d-flex">
          <v-btn @click="destroyUser()" class="btn_alert"
            >Passez à l'action</v-btn
          >
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
      nameRules: [
        (v) => !!v || "Le nom est requis",
        (v) => v.length <= 10 || "Min. 10 caractères",
      ],
      emailRules: [
        (v) => !!v || "Un e-mail est requis",
        (v) => /.+@.+/.test(v) || "Email non valide",
      ],
      email: "",
      alertProfil: false,
      noAlert: true,
    };
  },
  methods: {
    alert() {
      (this.alertProfil = true), (this.noAlert = false);
    },
    modifyUsername() {
      let valueForm = {
        username: this.username,
      };
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.getters.getToken,
        },
        body: JSON.stringify(valueForm),
      };
      fetch("http://localhost:3000/api/auth/modify/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.$store.commit("ADD_PROFILE", data);
          console.log("updateUser", data);
        });
    },
    modifyEmail() {
      let valueForm = {
        email: this.email,
      };
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.getters.getToken,
        },
        body: JSON.stringify(valueForm),
      };
      fetch("http://localhost:3000/api/auth/modify/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.$store.commit("ADD_PROFILE", data);
          console.log(data);
        });
    },
    destroyUser() {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
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
    ...mapGetters(["getAdmin", "getEmail", "getProfile", "getToken"]),
  },
};
</script>

<style scoped lang="scss">
.container {
  background-color: #f5f7fa;
  box-shadow: 0px 0px 24px -4px rgba(0, 0, 0, 0.35);
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 50%;
  height: 700px;
}
.img_avatar {
  width: 15%;
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
.btn_alert {
  margin-right: 10px;
}
.btn_home {
  text-decoration: none;
}
.container-modify {
  width: 80%;
}
.btn-delete {
  margin-top: 80px;
}
.badge_user {
  font-weight: 600;
  margin: 4% 0 5% 0;
  border-radius: 20px;
  border: 2px solid rgba(6, 112, 50, 0.644);
  padding: 10px;
}
.title-modify {
  font-weight: 600;
}
.container-alert {
  margin-top: 5%;
}
</style>
