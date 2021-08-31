<template>
  <v-form class="text_fields">
    <v-container class="d-flex flex-column">
      <v-textarea
        :rules="rules"
        counter="255"
        v-model="content"
        class="text_area"
        color="black"
        label="Quoi de neuf ?"
        no-resize
      ></v-textarea>
      <div class="menu_message d-flex justify-space-around align-center">
        <div class="wrapper">
          <emoji-picker @emoji="insert" :search="search">
            <div
              class="emoji-invoker"
              slot="emoji-invoker"
              slot-scope="{ events: { click: clickEvent } }"
              @click.stop="clickEvent"
            >
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                />
              </svg>
            </div>
            <div slot="emoji-picker" slot-scope="{ emojis }">
              <div class="emoji-picker">
                <div class="emoji-picker__search">
                  <input type="text" v-model="search" v-focus />
                </div>
                <div>
                  <div v-for="(emojiGroup, category) in emojis" :key="category">
                    <h5>{{ category }}</h5>
                    <div class="emojis">
                      <span
                        v-for="(emoji, emojiName) in emojiGroup"
                        :key="emojiName"
                        @click="insert(emoji)"
                        :title="emojiName"
                        >{{ emoji }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </emoji-picker>
        </div>
        <div class="file-input">
          <v-file-input
            v-model="image"
            accept="image/*"
            label="Votre image"
          ></v-file-input>
        </div>
        <div class="my-2">
          <v-btn @click="addMessage" text color="light-blue lighten-1" dark
            >Poster</v-btn
          >
        </div>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      image: null,
      content: "",
      search: "",
      rules: [(v) => v.length <= 255 || "Max 255 caractères"],
    };
  },
  methods: {
    insert(emoji) {
      this.content += emoji;
    },
    addMessage() {
      // let valueMessage = {
      //   content: this.content,
      //   title: "",
      //   likes: "",
      //   attachment: this.image
      // };
      // console.log(this.image)

      const formData = new FormData();
      formData.append("attachment", this.image);
      formData.append("content", this.content);
      console.log(this.image);

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.$store.getters.getToken,
        },
        body: formData,
      };
      fetch("http://localhost:3000/api/messages/create/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.content = "";
          this.image = null;
        });
      fetch("http://localhost:3000/api/messages/list")
        .then((response) => response.json())
        .then((data2) => {
          this.message = data2;
          this.$store.commit("ADD_MESSAGES", data2);
          console.log(data2);
        });
    },
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>

<style scoped lang="scss">
.text_fields {
  z-index: 1;
  padding: 20px 20px 0 20px;
  height: 270px;
  position: sticky;
  top: 0;
  background-color: #f5f7fa;
  box-shadow: 0px 0px 24px -4px rgba(0, 0, 0, 0.35);
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  margin-bottom: 50px;
}
.menu_message {
  width: 100%;
  position: sticky;
}
#textarea {
  height: 100px !important;
}
/******* EMojiPicker ******/

.wrapper {
  position: relative;
  display: inline-block;
}

.regular-input {
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: 1px solid rgb(218, 218, 218);
  width: 20rem;
  height: 12rem;
  outline: none;
}

.regular-input:focus {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.emoji-invoker {
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
  transition: all 0.2s;
}
.emoji-invoker > svg {
  fill: rgb(184, 177, 91);
}

.emoji-picker {
  position: absolute;
  z-index: 1;
  font-family: Inter;
  border: 1px solid rgb(218, 218, 218);
  width: 15rem;
  height: 20rem;
  overflow: scroll;
  overflow-x: hidden;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #f5f7fa;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid rgb(218, 218, 218);
  padding: 0.5rem 1rem;
  outline: none;
  width: 10rem;
  color: rgb(218, 218, 218);
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: rgb(218, 218, 218);
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: rgba(66, 153, 225, 0.5);
  cursor: pointer;
}

.icon_gif {
  transform: scale(1.4);
  &:hover {
    transform: scale(1.1);
    transition: ease-out 1s;
  }
}
.file-input {
  width: 40%;
}
</style>
