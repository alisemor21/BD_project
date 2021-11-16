<template>
  <div class="all">
    <h2>Алиса</h2>
    <h3>MANAGER</h3>
    <!-- <p>SOME TEXT</p> -->

    <div class="logoutBtn">
      <v-btn @click="onLogoutClicked" rounded elevation="8" color="rgb(109, 152, 134)" dark>
        Выйти из аккаунта
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: "ClientsPage",
  components: {},
  methods: {
    onLogoutClicked() {
      this.$router.push("/login");
    },
  },
  
};
</script>
