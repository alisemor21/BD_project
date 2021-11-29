<template>
  <div class="all">
    <v-btn
      @click="onLogoutClicked"
      rounded
      elevation="8"
      color="light-blue accent-3"
      dark
    >
      Выйти из аккаунта
    </v-btn>
  </div>
</template>
<script>
export default {
  name: "AccountPage",
  components: {},
  methods: {
    onLogoutClicked() {
      this.$router.push("/login");
    },
    
  },
};
</script>
