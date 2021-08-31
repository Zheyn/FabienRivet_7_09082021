<template>
 <div class="container">
  <v-simple-table
    fixed-header
    height="300px"
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Nom
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="getMessage in getMessages"
          :key="getMessage.id"
        >
          <td>{{ getMessage.User.username }}</td>
          <td><i class="fas fa-trash-alt"></i></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <v-simple-table
    fixed-header
    height="300px"
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Nom
          </th>
          <th class="text-left">
            Messages
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="getMessage in getMessages"
          :key="getMessage.id"
        >
          <td>{{ getMessage.User.username }}</td>
          <td>{{ getMessage.content }}</td>
          <td><i class="fas fa-trash-alt"></i></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
 </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
    ...mapGetters(["getAdmin", "getMessages"]),
  },
};
    
</script>

<style scoped lang="scss">

</style>
