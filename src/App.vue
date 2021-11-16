<template>
  <v-app>
    <div class="Navbar">
      <Navbar1 />
    </div>

    <v-container fluid>
      

      <v-content>
        <router-view></router-view>
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
//import HelloWorld from "./components/HelloWorld";
import Navbar1 from "@/components/Navbar1";
export default {
  name: "App",
  components: {
    Navbar1,
  },
  data(){
    return {
      appTitle: 'Awesome App',
      sidebar: false,
      menuItems: [
          // { title: 'Home', path: '/', icon: 'home'},
          { title: 'Задания', path: '/tasks', icon: 'task_alt' },
          { title: 'Сотрудники', path: '/employees', icon: 'supervisor_account' },
          { title: 'Клиенты', path: '/clients', icon: 'settings_accessibility' },
          { title: 'Отчёты', path: '/reports', icon: 'summarize' }
     ]
    }
  },
};
</script>
<style></style>
