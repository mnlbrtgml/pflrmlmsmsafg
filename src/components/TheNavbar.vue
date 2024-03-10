<template>
  <header class="border-b-neutral-300 bg-neutral-100 border sticky top-0 z-50">
    <nav class="container py-2 flex items-center justify-between gap-4">
      <RouterLink :to="{ name: links[0] }" class="flex items-center gap-2">
        <img src="@/assets/images/logo.png" alt="SMS Icon" class="size-12" />
        <h1 class="text-primary font-bold uppercase grid">
          <span class="text-xl">Smart Monitoring System</span>
          <span class="-mt-2 text-xs">for Ayungin Fish Growth</span>
        </h1>
      </RouterLink>

      <ul class="flex items-center">
        <li v-for="(link, index) in links" :key="index">
          <Button :variant="getButtonVariant(link)" asChild>
            <RouterLink :to="{ name: link }" class="font-semibold capitalize">
              {{ link }}
            </RouterLink>
          </Button>
        </li>
        <li class="grid place-items-center">
          <DropdownMenu>
            <Button variant="secondary" class="px-2" asChild>
              <DropdownMenuTrigger class="flex items-center gap-1">
                <div
                  v-if="!image"
                  class="border-blue-300 bg-blue-100 size-10 border rounded-lg grid place-items-center"
                >
                  {{ name ? name[0] : "" }}
                </div>
                <img v-else :src="image" class="size-9 object-contain object-center" />
              </DropdownMenuTrigger>
            </Button>

            <DropdownMenuContent align="end" class="border-t-primary w-56 border-t-4">
              <DropdownMenuLabel class="flex items-center gap-2">
                <div
                  v-if="!image"
                  class="border-blue-300 bg-blue-100 size-10 border rounded-lg grid place-items-center"
                >
                  {{ name ? name[0] : "" }}
                </div>
                <img v-else :src="image" class="size-9 object-contain object-center" />
                <div class="w-[9.5rem]">
                  <p class="truncate">{{ name }}</p>
                  <p class="text-gray-500 font-normal text-xs capitalize">{{ role }}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                @click="router.push({ name: 'profile' })"
                class="gap-2 cursor-pointer"
              >
                <svg
                  class="text-gray-700 size-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-width="2"
                    d="M7 17v1c0 .6.4 1 1 1h8c.6 0 1-.4 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <p>Profile</p>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <AlertDialog>
                  <AlertDialogTrigger
                    variant="secondary"
                    class="w-full relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-2 cursor-pointer"
                  >
                    <svg
                      class="text-gray-700 size-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                      />
                    </svg>
                    <p>Sign out</p>
                  </AlertDialogTrigger>

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
                        <AlertDialogAction>Sign out</AlertDialogAction>
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import type { ButtonVariant } from "@/assets/ts/types";
import { RouterLink, useRouter, useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { auth } from "@/firebase/config";
import { Variant } from "@/assets/ts/enums";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import useReadUser from "@/firebase/db/users/read";

const uid = auth.currentUser?.uid;
const name = ref<string | null>(null);
const role = ref<string | null>(null);
const image = ref<string | null>(null);
const router = useRouter();
const route = useRoute();
const links = router
  .getRoutes()
  .map((route) => route.name!.toString())
  .filter((name) => name !== "signup" && name !== "signin" && name !== "profile" && name !== "404");

function getButtonVariant(name: string): ButtonVariant {
  return route.name === name ? Variant.default : Variant.secondary;
}

async function handleFormSignOut(): Promise<void> {
  await useSignOut().then(() => router.push({ name: "signin" }));
}

onMounted(async () => {
  const response = await useReadUser(uid as string);

  if (response) {
    name.value = `${response.data.firstName} ${response.data.lastName}`;
    role.value = response.data.userRole;
    image.value = response.data.imagePath;
  }
});
</script>
