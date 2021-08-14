<template>
  <v-form v-model="valid">
    <v-container fluid>
      <v-row class="row d-flex align-center justify-center">
        <div
          class="container_log d-flex justify-center align-center flex-column"
        >
          <h1>Inscription</h1>
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="Nom"
            required
          ></v-text-field>

          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Prénom"
            required
          ></v-text-field>

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
            name="input-10-1"
            label="Mot de passe"
            hint="Au moins 8 charactères"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <div class="button_log">
            <v-btn depressed color="primary" class="button_log-1"> S'inscrire </v-btn>
            <v-btn depressed color="primary"> Se connecter </v-btn>
          </div>
        </div>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      (v) => !!v || "Le nom est requis",
      (v) => v.length <= 10 || "Le nom doit comporter moins de 10 caractères",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "Un e-mail est requis",
      (v) => /.+@.+/.test(v) || "L'email doit être valide",
    ],

    show1: false,
    show2: true,
    show3: false,
    show4: false,
    password: "",

    passwordRules: [(v) => v.length >= 8 || "Minimum 8 charactères"],
  }),
};
</script>


<style scoped>
.container {
  height: 50%;
  width: 80vw;
}
.container_log {
  height: 50%;
  width: 40vw;
  border-radius: 50px;
  background-color: rgb(216, 216, 216);
}
.col {
  height: 5px;
}
.row {
  height: 100vh;
  transform: translateY(-15%);
}
.v-input {
  flex: none;
}
.button_log-1{
  padding-right: 10px;
}
</style>