<template>
  <v-form v-model="valid" ref="form">
    <v-container fluid>
      <v-row class="row d-flex align-center justify-center">
        <div
          class="container_log d-flex justify-center align-center flex-column"
        >
          <h1>Connexion</h1>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show1 ? 'text' : 'password'"
            name="password"
            label="Mot de passe"
            hint="8 caractères"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>

          <div class="button_log">
            <router-link to="/Register" class="link_btn">
              <v-btn depressed text color="primary" class="button_log-1">
                S'inscrire
              </v-btn>
            </router-link>

            <v-btn
              :disabled="!valid"
              depressed
              class="button_log-2"
              @click="addLog"
            >
              Se connecter
            </v-btn>
          </div>
        </div>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "Un e-mail est requis",
      (v) => /.+@.+/.test(v) || "Email non valide",
    ],

    show1: false,
    password: "",
    password2: "",
    passwordRules: [
      (v) => v.length >= 8 || "Min. 8 caractères",
      (v) => !!v || "Mot de passe requis",
    ],
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    addLog() {
      let valueForm = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("fetchLogin", {
          endpoint: "auth/login",
          valueForm: valueForm,
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.userId) {
            this.$store.commit("ADD_PROFILE", data);
            document.location.href = "#/Home";
          } else {
            alert("Mot de passe ou nom d'utilisateur incorrect");
          }
        });
      this.$store
        .dispatch("fetchListMessages", {
          endpoint: "messages/list",
        })
        .then((response) => response.json())
        .then((data2) => {
          this.$store.commit("ADD_MESSAGES", data2);
        });
    },
  },
};
</script>


<style scoped lang="scss">
@import "_formlog";
.container {
  height: 50%;
  width: 80vw;
}
.container_log {
  height: 450px;
  width: 30vw;
  border-radius: 50px;
  background-color: #f5f7fa;
  box-shadow: 0px 0px 24px -4px rgba(0, 0, 0, 0.75);
  animation: container_style 1s;
  & h1 {
    color: rgb(32, 32, 32);
    margin-bottom: 10px;
    margin-top: 20px;
    font-size: 1.8rem;
  }
}
.col {
  height: 5px;
}
.row {
  height: 100vh;
  transform: translateY(-10%);
}
.v-input {
  flex: none;
}
.button_log {
  margin-bottom: 30px;
  margin-top: 20px;
}
.button_log-1 {
  margin-right: 10px;
  margin-top: 15px;
}
.button_log-2 {
  background-color: #e91e63 !important;
  color: azure !important;
  margin-top: 15px;
}
.link_btn {
  text-decoration: none;
}
.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: rgba(92, 92, 92, 0.897) !important;
}
</style>