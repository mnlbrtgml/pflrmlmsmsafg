<template>
  <section class="h-screen grid grid-cols-2">
    <div class="flex items-center justify-end">
      <div class="w-[30rem]">
        <img src="@/assets/images/urs-logo.png" alt="URS Logo" class="h-20 mx-auto" />

        <div class="text-center">
          <p class="text-xl font-medium">
            Proposed Features for <br />
            Linear Regression Machine Learning Model of a
          </p>
          <h3 class="text-primary text-6xl font-bold uppercase">Smart Monitoring System</h3>
          <h4 class="text-primary text-xl font-semibold uppercase">for Ayungin Fish Growth</h4>
        </div>
      </div>
    </div>

    <div class="grid place-items-center">
      <form
        @submit.prevent="handleFormSignIn"
        class="border-neutral-300 bg-neutral-100 w-80 border rounded-lg p-8 grid gap-2"
      >
        <p class="text-xl text-center font-bold uppercase mb-4">Sign in to continue</p>

        <div class="space-y-1">
          <Label for="email"> Email </Label>
          <Input v-model.trim="form.email" type="email" id="email" required />
        </div>

        <div class="space-y-1">
          <Label for="password"> Password </Label>
          <Input
            v-model.trim="form.password"
            :type="isShowPassword ? 'text' : 'password'"
            id="password"
            required
          />
        </div>

        <div class="flex items-center gap-1">
          <Checkbox @update:checked="isShowPassword = !isShowPassword" id="show-password" />
          <Label for="show-password" class="text-xs"> Show password </Label>
        </div>

        <Button type="submit" class="mt-8"> Sign in </Button>
        <Button @click="navigateToSignUp" variant="link" class="w-min mx-auto">
          Register new account
        </Button>
      </form>
    </div>
  </section>

  <LoadingSpinner v-if="isShowLoading" />
</template>

<script lang="ts" setup>
import type { ISignInForm, IResponse } from "@/assets/ts/interfaces";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import useSignIn from "@/firebase/auth/signin";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const { toast } = useToast();
const router = useRouter();
const isShowLoading = ref<boolean>(false);
const isShowPassword = ref<boolean>(false);
const form = reactive<ISignInForm>({
  email: "",
  password: "",
});

function resetForm(): void {
  form.email = "";
  form.password = "";
}

async function handleFormSignIn(): Promise<void> {
  isShowLoading.value = true;

  if (form.email && form.password) {
    const response: IResponse = await useSignIn(form.email, form.password);

    if (response.data) {
      isShowLoading.value = false;

      await router.push({ name: "home" });

      toast({
        title: "Sign in successful!",
        description: "Welcome back!",
        duration: 1500,
      });
    } else {
      isShowLoading.value = false;

      toast({
        title: "Sign in failed!",
        description: "Invalid username and/or password!",
        variant: "destructive",
        duration: 1500,
      });
    }
  } else {
    isShowLoading.value = false;

    toast({
      title: "Sign in failed!",
      description: "Please input your email and password!",
      variant: "destructive",
      duration: 1500,
    });
  }
}

async function navigateToSignUp(): Promise<void> {
  resetForm();
  await router.push({ name: "signup" });
}
</script>
