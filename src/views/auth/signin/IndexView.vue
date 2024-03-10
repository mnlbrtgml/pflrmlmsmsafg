<template>
  <section
    class="bg-[url('@/assets/images/background.png')] bg-cover bg-center bg-no-repeat h-screen pr-40 pt-16 flex items-center justify-center gap-4"
  >
    <div class="text-right">
      <div>
        <p class="text-xl font-medium">
          Proposed Features for <br />
          Linear Regression Machine Learning Model of a
        </p>
        <h3 class="text-primary text-8xl font-bold uppercase">
          Smart <br />
          Monitoring <br />
          System
        </h3>
        <h4 class="text-primary text-xl font-semibold uppercase">for Ayungin Fish Growth</h4>
      </div>
    </div>

    <form
      @submit.prevent="handleFormSignIn"
      class="border-neutral-300 bg-neutral-100 w-80 border rounded-lg p-8 grid gap-2 relative"
    >
      <img
        src="@/assets/images/logo.png"
        alt="URS Logo"
        class="border-neutral-300 bg-neutral-100 h-36 mx-auto p-4 border-t-2 rounded-full absolute -top-[calc(30%_-_4.5rem)]"
      />

      <p class="text-xl text-center font-bold uppercase mt-12 mb-4">Sign in to continue</p>

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
  </section>

  <LoadingSpinner v-if="isShowLoading" />
</template>

<script lang="ts" setup>
import type { ISignInForm, IResponse } from "@/assets/ts/interfaces";
import type { PropsToast } from "@/assets/ts/types";
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
const toastProperties = reactive<PropsToast>({
  title: undefined,
  description: undefined,
  variant: undefined,
  duration: 1500,
});
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

      toastProperties.title = "Sign in successful!";
      toastProperties.description = "Welcome back!";
      toastProperties.variant = "default";
    } else {
      isShowLoading.value = false;
      toastProperties.title = "Sign in failed!";
      toastProperties.description = "Invalid username and/or password!";
      toastProperties.variant = "destructive";
    }
  } else {
    isShowLoading.value = false;
    toastProperties.title = "Sign in failed!";
    toastProperties.description = "Please input your email and password!";
    toastProperties.variant = "destructive";
  }

  toast({ ...toastProperties });
}

async function navigateToSignUp(): Promise<void> {
  resetForm();
  await router.push({ name: "signup" });
}
</script>
