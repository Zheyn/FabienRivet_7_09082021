<template>
  <div class="container_wall">
    <div class="card_message">
      <p class="profil_content">
          <span class="username_profile">Zheyn</span> 22/08/2021
      </p>
      <p class='text_content'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed voluptatem,
        tenetur cupiditate, magnam error aperiam nisi pariatur excepturi
        architecto iste deleniti nam quaerat obcaecati ad iure saepe quod
        quibusdam eos!
      </p>
      <div class="likes d-flex justify-end">
          <v-btn
        class="ma-2"
        text
        icon
        color="blue lighten-2"
      >
        <v-icon>mdi-thumb-up</v-icon>
      </v-btn>

      <v-btn
        class="ma-2"
        text
        icon
        color="red lighten-2"
      >
        <v-icon>mdi-thumb-down</v-icon>
      </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
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
  box-shadow: 0px 0px 24px -4px rgba(0, 0, 0, 0.25);
  margin-top: 50px;
  border-radius: 20px;
}
.profil_content{
    padding: 15px 0 0 15px;
}
.text_content {
  padding: 10px 10px 0 10px;
}
.username_profile{
    font-weight: 600;
}
.likes{
    padding: 0px 15px 0 0;
}
</style>