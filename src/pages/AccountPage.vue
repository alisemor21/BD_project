<template>
  <div class="all">
    <div class="cartochka">
      <div class="cartochka-text">
        <template v-if="employee">
          <h1>{{ this.employee.name }}</h1>
          <h1>{{ this.employee.role }}</h1>
        </template>
      </div>
      <div class="cartochka-btn">
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
    </div>
  </div>
</template>
<script>
import { doLogout } from "@/netClient/authService";
import { getMyInfo } from "@/netClient/employeesService";
export default {
  name: "AccountPage",
  data: () => ({
    employee: null,
  }),
  created() {
    this.showMyInfo();
  },
  methods: {
    async showMyInfo() {
      try {
        this.employee = await getMyInfo();
      } catch (error) {
        console.error({ error });
      }
    },
    async onLogoutClicked() {
      try {
        await doLogout();
        this.$router.push("/login");
      } catch (error) {
        console.error({ error });
      }
    },
  },
};
</script>

<style scoped>
.all{
  border: 5px solid rgb(0, 0, 0);
  border-radius: 3pc;
  margin-top: 8%;
  margin-left: 33%;
  width: 30%;
  min-width: 300px;
  max-width: 450px;
  box-shadow: rgb(146, 141, 128) 20px 20px 20px;
}
.cartochka {
  text-align: center;
  /* border: 1pc solid black;
  border-radius: 3pc;
  width: 400px; */
}

.cartochka-text {
  margin-top: 3pc;
  margin-bottom: 3pc;
}
.cartochka-btn {
  margin-bottom: 3pc;
}

.h1 {
  margin: 10pc;
}
</style>
