<template>
  <div class="all">
    <ul>
      <template v-if="employee">
        <h1><li>{{this.employee.name}}</li></h1>
        <h1><li>{{this.employee.role}}</li></h1>
      </template>
        
      </ul>
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
import { doLogout } from "@/netClient/authService";
import { getMyInfo } from "@/netClient/employeesService";
export default {
  name: "AccountPage",
  data: () => ({
    employee: null
  }),
  created() {
    this.showMyInfo()
  },
  methods: {
    async showMyInfo(){
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
