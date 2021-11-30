<template>
  <div class="main-layout">
    <Navbar1/>
    <div class="page-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar1 from "@/components/Navbar1";

export default {
  name: "MainLayout",
  components: {
    Navbar1,
  },
};
</script>
