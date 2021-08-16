<template>
  <v-form v-model="valid">
    <v-container fluid>
      <v-row class="row d-flex align-center justify-center">
        <div
          class="container_log d-flex justify-center align-center flex-column"
        >
          <h1>Inscription</h1>
          <v-text-field
            @keyup.enter="addForm"
            class="name_form"
            value="firstname"
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
            <router-link to="/Home">
              <v-btn 
              depressed 
              color="primary" 
              class="button_log-1"
              >
                S'inscrire
              </v-btn>
            </router-link>
            <v-btn 
            depressed 
            class="button_log-2"
            > Se connecter </v-btn>
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
    methods:{
      addForm () {
        
        console.log(this.firstname, this.lastname, this.email)     
      }
    }
};
</script>


<style scoped lang="scss">
@import "_formlog";
.container {
  height: 50%;
  width: 80vw;
}
.container_log {
  height: 560px;
  width: 30vw;
  border-radius: 50px;
  background-color: #f5f7fa;
  box-shadow: 0px 0px 24px -4px rgba(0,0,0,0.75);
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
.button_log{
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
</style>