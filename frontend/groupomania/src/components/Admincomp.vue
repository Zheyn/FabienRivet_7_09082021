<template>
  <div class="container d-flex flex-column align-start">
    <router-link to="Home" class="btn_home align-self-start">
      <v-btn class="ma-2" text color="light-green darken-2" dark>
        <v-icon dark left> mdi-arrow-left </v-icon>Retour
      </v-btn>
    </router-link>
    <v-btn
      @click="addUsers"
      depressed
      text
      color="primary"
      class="button_log-2"
    >
      Voir les utilisateurs
    </v-btn>
    <v-simple-table fixed-header class="table-users">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nom</th>
            <th class="text-left">Email</th>
            <th class="text-left">Admin</th>
            <th class="text-left">Id</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.isAdmin }}</td>
            <td>{{ user.id }}</td>
            <td>
              <v-btn
                @click="deleteUser(user)"
                class="ma-2"
                text
                color="red lighten-1"
              >
                Supprimer
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-btn
      @click="addMessages"
      depressed
      text
      color="primary"
      class="button_log-2"
    >
      Voir les messages
    </v-btn>
    <v-simple-table fixed-header height="300px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nom</th>
            <th class="text-left">Messages</th>
            <th class="text-left">Likes</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="message in messages" :key="message.id">
            <td>{{ message.User.username }}</td>
            <td>{{ message.content }}</td>
            <td>{{ message.likes }}</td>
            <td>
              <v-btn
                @click="deleteMessage(message.id)"
                class="ma-2"
                text
                color="red lighten-1"
              >
                Supprimer
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      users: [],
      messages: [],
    };
  },
  methods: {
    addUsers() {
      this.$store
        .dispatch("fetchGetUsers", {
          endpoint: "admin",
        })
        .then((response) => response.json())
        .then((data) => {
          this.users = data;
        });
    },
    addMessages() {
      this.$store
        .dispatch("fetchListMessages", {
          endpoint: "messages/list",
        })
        .then((response) => response.json())
        .then((data) => {
          this.messages = data;
        });
    },
    deleteMessage(messageId) {
      let idMessage = {
        id: messageId,
      };
      this.$store
        .dispatch("fetchDeleteMessages", {
          endpoint: "admin/destroy",
          idMessage: idMessage,
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });

      this.$store
        .dispatch("fetchListMessages", {
          endpoint: "messages/list",
        })
        .then((response) => response.json())
        .then((data) => {
          this.messages = data;
        });
    },
    deleteUser(user) {
      let idUser = {
        idUser: user.id,
      };
      this.$store
        .dispatch("fetchDeleteUsers", {
          endpoint: "admin",
          idUser: idUser,
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
      this.$store
        .dispatch("fetchGetUsers", {
          endpoint: "admin",
        })
        .then((response) => response.json())
        .then((data) => {
          this.users = data;
        });
    },
  },
  mounted: function () {
    this.deleteMessage();
  },
  destroyed: function () {
    this.deleteMessage();
    this.deleteUser();
  },
  computed: {
    ...mapGetters(["getAdmin", "getToken"]),
  },
};
</script>

<style scoped lang="scss">
.btn_home {
  text-decoration: none;
}
.table-users {
  margin-bottom: 50px;
}
</style>
