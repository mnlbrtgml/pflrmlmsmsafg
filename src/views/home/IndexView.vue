<template>
  <h1 class="text-3xl font-bold underline">Home!</h1>
  <Button @click="handleFormSignOut" type="button">Sign out</Button>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import useSignOut from "@/firebase/auth/signout";

const router = useRouter();

async function handleFormSignOut(): Promise<void> {
  await useSignOut().then(() => router.push({ name: "signin" }));
}
</script>
