<template>
  <section
    class="bg-[url('@/assets/images/background.png')] bg-cover bg-center bg-no-repeat h-screen p-8 grid place-items-center"
  >
    <form
      @submit.prevent="handleFormSignUp"
      class="border-neutral-300 bg-neutral-100 min-w-[60%] max-w-[70rem] border rounded-lg p-8 grid gap-2"
    >
      <p class="text-xl text-center font-bold uppercase mb-4">Register new account</p>

      <div class="grid grid-cols-3 gap-2">
        <div class="space-y-1">
          <Label for="first-name"> First name <span class="text-destructive">*</span> </Label>
          <Input v-model.trim="form.firstName" id="first-name" type="text" required />
        </div>

        <div class="space-y-1">
          <Label for="middle-name"> Middle name </Label>
          <Input v-model.trim="form.middleName" id="middle-name" type="text" />
        </div>

        <div class="space-y-1">
          <Label for="last-name"> Last name <span class="text-destructive">*</span> </Label>
          <Input v-model.trim="form.lastName" id="last-name" type="text" required />
        </div>
      </div>

      <div class="grid grid-cols-3 gap-2">
        <div class="space-y-1">
          <Label for="email"> Email <span class="text-destructive">*</span> </Label>
          <Input v-model.trim="form.email" id="email" type="email" required />
        </div>

        <div class="space-y-1">
          <Label for="password"> Password <span class="text-destructive">*</span> </Label>
          <Input v-model.trim="passwords.password" id="password" type="password" required />
        </div>

        <div class="space-y-1">
          <Label for="retype-password">
            Retype password <span class="text-destructive">*</span>
          </Label>
          <Input
            v-model.trim="passwords.retypePassword"
            id="retype-password"
            type="password"
            required
          />
        </div>
      </div>

      <div class="ml-auto mt-8 flex gap-2">
        <Button @click="navigateToSignIn" type="button" variant="secondary">
          I already have an account
        </Button>
        <Button type="submit"> Save and sign in </Button>
      </div>
    </form>
  </section>

  <LoadingSpinner v-if="isShowLoading" />
</template>

<script lang="ts" setup>
import type { ISignUpForm, IResponse } from "@/assets/ts/interfaces";
import { Role } from "@/assets/ts/enums";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import useSignUp from "@/firebase/auth/signup";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const { toast } = useToast();
const router = useRouter();
const isShowLoading = ref<boolean>(false);
const passwords = reactive({
  password: "",
  retypePassword: "",
});
const form = reactive<ISignUpForm>({
  id: "",
  firstName: "",
  middleName: "",
  lastName: "",
  role: Role.viewer,
  email: "",
  password: "",
});

async function handleFormSignUp(): Promise<void> {
  isShowLoading.value = true;

  if (passwords.password !== passwords.retypePassword) {
    isShowLoading.value = false;

    toast({
      title: "Sign up failed!",
      description: "Passwords do not match!",
      variant: "destructive",
      duration: 1500,
    });

    return;
  }

  form.password = passwords.password;

  const response: IResponse = await useSignUp(form);

  if (response.data) {
    isShowLoading.value = false;

    await router.push({ name: "home" });

    toast({
      title: "Sign up successful!",
      description: "Welcome to PFLRMLMSMSAFG!",
      duration: 1500,
    });
  } else {
    isShowLoading.value = false;

    toast({
      title: "Sign up failed!",
      description: "Please use invalid credentials!",
      variant: "destructive",
      duration: 1500,
    });
  }
}

async function navigateToSignIn(): Promise<void> {
  await router.push({ name: "signin" });
}
</script>
