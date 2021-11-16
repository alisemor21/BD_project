<template>
  <v-toolbar app v-if="$route.name !== 'loginPage'">
    <span class="hidden-sm-and-up">
      <v-toolbar-side-icon @click="sidebar = !sidebar"> </v-toolbar-side-icon>
    </span>

    <v-toolbar-items class="hidden-xs-only">
      <v-btn
        col4
        flat
        v-for="item in menuItems"
        :key="item.title"
        :to="item.path"
      >
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
//import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  data() {
    return {
      appTitle: "Awesome App",
      sidebar: false,
      menuItems: [
        { title: "Аккаунт", path: "/", icon: "account_circle" },
        { title: "Задания", path: "/tasks", icon: "task_alt" },
        { title: "Сотрудники", path: "/employees", icon: "supervisor_account" },
        { title: "Клиенты", path: "/clients", icon: "settings_accessibility" },
        { title: "Отчёты", path: "/reports", icon: "summarize" },
      ],
    };
  },
};
</script>
<style></style>
