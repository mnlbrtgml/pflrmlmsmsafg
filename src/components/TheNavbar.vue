<template>
  <header class="border-b-neutral-300 bg-neutral-100 p-2 border sticky top-0 z-50">
    <nav class="p-2 flex items-center justify-between gap-4">
      <RouterLink
        :to="{ name: 'home' }"
        class="text-4xl font-bold uppercase flex items-center gap-2"
      >
        <img src="@/assets/images/logo.png" alt="SMS Icon" class="h-12" />
        <h1 class="text-primary">Smart Monitoring System</h1>
      </RouterLink>

      <ul class="flex items-center">
        <li>
          <Button :variant="route.name === 'home' ? 'default' : 'secondary'" asChild>
            <RouterLink :to="{ name: 'home' }">Home</RouterLink>
          </Button>
        </li>
        <li>
          <Button :variant="route.name === 'parameters' ? 'default' : 'secondary'" asChild>
            <RouterLink :to="{ name: 'parameters' }">Parameters</RouterLink>
          </Button>
        </li>
        <li>
          <Button :variant="route.name === 'graphs' ? 'default' : 'secondary'" asChild>
            <RouterLink :to="{ name: 'graphs' }">Graph</RouterLink>
          </Button>
        </li>
        <li>
          <Button :variant="route.name === 'profile' ? 'default' : 'secondary'" asChild>
            <RouterLink :to="{ name: 'profile' }">Profile</RouterLink>
          </Button>
        </li>
        <li class="ml-8">
          <AlertDialog>
            <Button variant="destructive" asChild>
              <AlertDialogTrigger>Sign out</AlertDialogTrigger>
            </Button>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sign out account</AlertDialogTitle>

                <AlertDialogDescription>
                  Are you use sure you want to sign out your account?
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <Button @click="handleFormSignOut" variant="destructive" asChild>
                  <AlertDialogAction> Sign out </AlertDialogAction>
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { RouterLink, useRouter, useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import useSignOut from "@/firebase/auth/signout";

const router = useRouter();
const route = useRoute();

async function handleFormSignOut(): Promise<void> {
  await useSignOut().then(() => router.push({ name: "signin" }));
}
</script>
