<template>
  <TheNavbar v-if="route.meta.requiresAuth" />

  <main :class="{ 'p-4': route.meta.requiresAuth }">
    <RouterView />
  </main>

  <Toaster />
</template>

<script lang="ts" setup>
import { RouterView, useRoute } from "vue-router";
import TheNavbar from "@/components/TheNavbar.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";

const route = useRoute();
</script>
