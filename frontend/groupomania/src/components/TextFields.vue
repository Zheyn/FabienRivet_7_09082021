<template>
  <v-form class="text_fields">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-textarea
            class="text_area"
            color="white"
            label="Votre message"
            no-resize
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  
</script>

<style lang="scss">
    .text_fields {
      height: auto;
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        position: sticky;
        top: 55px;
        border-left: .5px solid rgb(218, 218, 218);
        border-right: .5px solid rgb(218, 218, 218);
        background-color: rgb(21, 32, 43);
    }
    .text_area {
      
    }
    .theme--light.v-input input, .theme--light.v-input textarea{
      color:#fff !important;
      font-size: 1rem;
      margin-top: 15px;
      height: 80px;
    }
    .theme--light.v-label{
      color: #485561 !important;
    }
    .v-text-field > .v-input__control{
      border-bottom: 1px solid rgb(57, 83, 110);
    }
    .v-text-field > .v-input__control > .v-input__slot:before{
      border: none !important;
    }
    .v-text-field > .v-input__control > .v-input__slot:after{
      border: none !important;
    }
    ::-webkit-scrollbar{
      width: 6px;
      background: rgb(33, 49, 65);
      border-radius: 2px;
    }
    ::-webkit-scrollbar-thumb{
      background: rgb(57, 83, 110);
      border-radius: 2px;
    }
</style>