<template>
  <v-form class="text_fields">
    <v-container>
      <v-row>
        <v-textarea
          v-model="input"
          id="textarea"
          class="text_area"
          color="white"
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
              <div slot="emoji-picker" slot-scope="{ emojis}">
                <div
                  class="emoji-picker"
                >
                  <div class="emoji-picker__search">
                    <input type="text" v-model="search" v-focus />
                  </div>
                  <div>
                    <div
                      v-for="(emojiGroup, category) in emojis"
                      :key="category"
                    >
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
          <v-icon
            class="icon_gif"
            large
            color="green lighten-2"
            @click.stop="clickEvent"
          >
            mdi-gif
          </v-icon>
          <div class="my-2">
            <v-btn color="light-blue lighten-1" dark>Poster</v-btn>
          </div>
        </div>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: function () {
    return {
      input: "",
      search: "",
    };
  },
  methods: {
    insert(emoji) {
      this.input += emoji;
    },
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

<style lang="scss">
.text_fields {
  height: auto;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  position: sticky;
  top: 55px;
  border-left: 0.5px solid rgb(218, 218, 218);
  border-right: 0.5px solid rgb(218, 218, 218);
  background-color: rgb(21, 32, 43);
}
.text_area {
  padding: 0 10px 0 10px;
}
.theme--light.v-input input,
.theme--light.v-input textarea {
  color: #fff !important;
  font-size: 1rem;
  margin-top: 15px;
  height: 80px;
}
.theme--light.v-label {
  color: #485561 !important;
}
.v-text-field > .v-input__control {
  border-bottom: 1px solid rgb(57, 83, 110);
}
.v-text-field > .v-input__control > .v-input__slot:before {
  border: none !important;
}
.v-text-field > .v-input__control > .v-input__slot:after {
  border: none !important;
}
::-webkit-scrollbar {
  width: 6px;
  background: rgb(33, 49, 65);
  border-radius: 2px;
}
::-webkit-scrollbar-thumb {
  background: rgb(57, 83, 110);
  border-radius: 2px;
}

.menu_message {
  width: 100%;
  position: sticky;
  top: 205px;
  background-color: rgb(21, 32, 43);
  grid-row: 3 / 4;
  grid-column: 2 / 3;
  border-bottom: 0.5px solid rgb(218, 218, 218);
}

/* EMojiPicker */

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
  fill: rgb(230, 218, 56);
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
  background: rgb(21, 32, 43);
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

.icon_gif{
  &:hover{
    transform: scale(1.1);
    transition: ease-out 1s;
  }
}
</style>