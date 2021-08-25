<template>
  <div class="container_wall">
    <div
      v-for="getMessage in getMessages"
      :key="getMessage.id"
      class="card_message"
    >
      <div class="info-message d-flex justify-space-between">
        <p class="profil_content">
          <span class="username_profile"> {{ getMessage.User.username }} </span>
          <span class="date"> {{ getMessage.createdAt }}</span>
          <span class="message-id"> {{ getMessage.id }}</span>
        </p>
        <div class="btn-top d-flex align-center">
          <v-btn
            @click="idMessage(getMessage.id)"
            v-if="getAdmin"
            text
            icon
            color="red lighten-2"
            ><v-icon>mdi-delete-forever</v-icon></v-btn
          >
          <v-switch 
          v-model="switch1"
          
          ></v-switch>
        </div>
      </div>
      <p v-if="!switch1" class="text_content">
        {{ getMessage.content }}
      </p>
      <v-textarea
        v-if="switch1"
        :rules="rules"
        counter="255"
        v-model="contentModify"
        class="text_area"
        color="black"
        no-resize
      ></v-textarea>
      <div class="likes d-flex justify-end">
        <v-btn disabled class="ma-2" text icon color="blue lighten-2">
          <v-icon>mdi-thumb-up </v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      contentModify: "",
      rules: [(v) => v.length <= 255 || "Max 255 caractères"],
      switch1: false,
    };
  },
  methods: {
    idMessage(messageId) {
      let idMessage = {
        id: messageId,
      };
      console.log(idMessage);
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.getters.getToken,
        },
        body: JSON.stringify(idMessage),
      };
      fetch("http://localhost:3000/api/messages/destroy/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("Response data id message", data);
        });
      fetch("http://localhost:3000/api/messages/")
        .then((response) => response.json())
        .then((data2) => {
          this.$store.commit("ADD_MESSAGES", data2);
          console.log(data2);
        });
    },
  },
  computed: {
    ...mapGetters(["getMessages", "getAdmin"]),
  },
};
</script>

<style scoped lang="scss">
.container_wall {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: 2 / 3;
  grid-row: 4 / 5;
}
.card_message {
  width: 100%;
  box-shadow: 0px 0px 24px -4px rgba(0, 0, 0, 0.25);
  margin-top: 50px;
  border-radius: 20px;
}
.profil_content {
  padding: 15px 0 0 15px;
}
.text_content {
  padding: 10px 10px 0 10px;
}
.username_profile {
  font-weight: 600;
}
.likes {
  padding: 0px 15px 0 0;
}
</style>