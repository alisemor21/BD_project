<template>
  <div id="app">
    <v-app id="inspire">
      <div class="page-content">
        <component :is="layout">
          <router-view />
        </component>
      </div>
    </v-app>
  </div>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";

export default {
  name: "App",
  components: {
    MainLayout,
    AuthLayout,
  },
  computed: {
    layout() {
      return this.$route.meta?.layout;
    },
    data() {
      return {
        appTitle: "Awesome App",
        sidebar: false,
        menuItems: [
          { title: "Задания", path: "/tasks", icon: "task_alt" },
          {
            title: "Сотрудники",
            path: "/employees",
            icon: "supervisor_account",
          },
          {
            title: "Клиенты",
            path: "/clients",
            icon: "settings_accessibility",
          },
          { title: "Отчёты", path: "/reports", icon: "summarize" },
        ],
      };
    },
  },
};
</script>
<style>
.page-content {
  padding: 120px 32px 64px 32px;
}
</style>
