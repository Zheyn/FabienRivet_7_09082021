<template>
  <div class="container_wall">
    <TextFields v-on:newMessage = "newMessage" />
    <div v-for="message in messages" :key="message.id" class="card_message">
      <div class="info-message d-flex justify-space-between">
        <p class="profil_content">
          <span class="username_profile"> {{ message.User.username }} </span>
          <span class="date">
            {{ message.createdAt | moment("from", "now", true) }}</span
          >
        </p>
        <div class="btn-top d-flex align-center">
          <v-btn
            @click="deleteMessage(message)"
            v-if="getAdmin"
            text
            icon
            color="red lighten-2"
            ><v-icon>mdi-delete-forever</v-icon></v-btn
          >
          <v-switch v-model="message.switch1"></v-switch>
        </div>
      </div>
      <div class="container-content d-flex flex-column align-center">
        <p v-if="!message.switch1" class="text-content align-self-start">
          {{ message.content }}
        </p>
        <div class="text_area-modify d-flex align-center justify-center">
          <v-textarea
            v-if="message.switch1"
            :rules="rules"
            counter="255"
            v-model="message.content"
            class="text_area-switch"
            color="black"
            no-resize
          ></v-textarea>
          <v-btn
            @click="modify(message)"
            v-if="message.switch1"
            text
            color="primary"
            small
          >
            Modifier
          </v-btn>
        </div>
        <div class="container-img">
          <img v-bind:src="message.attachment" alt="" class="img-content" />
          <v-btn
            class="delete-image"
            @click="deleteMessage(message)"
            v-if="message.switch1"
            icon
            color="red"
            ><v-icon>mdi-close-circle</v-icon></v-btn
          >
        </div>
      </div>
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
import TextFields from '../components/TextFields'
export default {
   components: {
      TextFields, 
    },
  data() {
    return {
      messages: [],
      contentModify: "",
      rules: [(v) => v.length <= 255 || "Max 255 caractères"],
      switch1: false,
    };
  },
  methods: {
    newMessage(message) {
      this.messages.unshift(message)

    },
    modify(message) {
      this.$store
        .dispatch("fetchModifyMessages", {
          endpoint: "messages/modify",
          message: message,
        })
        .then((response) => response.json())
        .then(() => {
          message.switch1 = false;
        });
    },

    deleteMessage(message) {
      let idMessage = {
        id: message.id,
      };
      this.$store
        .dispatch("fetchDeleteMessages", {
          endpoint: "admin/destroy",
          idMessage: idMessage,
        })
        .then((response) => response.json())
        .then(() => {
          this.messages = this.messages.filter((item) => item != message);
        });
    },
    getMessages() {
      this.$store
        .dispatch("fetchListMessages", {
          endpoint: "messages/list",
        })
        .then((response) => response.json())
        .then((data2) => {
          this.messages = data2;
        });
    },
  },
  created: function () {
    this.getMessages();
  },
 
  computed: {
    ...mapGetters(["getAdmin"]),
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
.username_profile {
  font-weight: 600;
}
.likes {
  padding: 0px 15px 0 0;
}
.text_area-modify {
  width: 95%;
}
.container-content {
  border: 2px solid rgba(0, 0, 0, 0.205);
  border-radius: 20px;
  padding: 15px;
  margin: auto;
  width: 60%;
  & .img-content {
    border-radius: 10px;
    width: 100%;
  }
  & .text-content {
    font-size: 1.1rem;
    font-weight: 400;
    padding-left: 10px;
  }
}
.container-img {
  position: relative;
  & .delete-image {
    position: absolute;
    transform: translateX(-40px);
  }
}
</style>
