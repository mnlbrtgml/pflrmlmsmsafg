<template>
  <RouterView />
  <Toaster />
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>
