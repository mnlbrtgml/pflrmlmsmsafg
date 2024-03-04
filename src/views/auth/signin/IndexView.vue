<template>
  <section class="h-screen grid place-items-center">
    <form v-on:submit.prevent="" class="w-96 p-8 grid gap-2">
      <img src="@/assets/images/urs-logo.png" alt="URS Logo" class="h-20 mx-auto" />

      <div class="text-center">
        <p class="text-xs">
          Proposed Features for <br />
          Linear Regression Machine Learning Model of a
        </p>
        <h3 class="text-primary text-xl font-bold uppercase">Smart Monitoring System</h3>
        <h4 class="text-primary font-semibold uppercase">for Ayungin Fish Growth</h4>
      </div>

      <p class="text-center font-medium">Sign in to continue</p>

      <div>
        <Label for="email"> Email </Label>
        <Input type="email" />
      </div>

      <div>
        <Label for="password"> Password </Label>
        <Input type="password" />
      </div>

      <div class="flex items-center gap-1">
        <Checkbox id="show-password" />
        <Label for="show-password" class="text-xs"> Show password </Label>
      </div>

      <Button type="submit" class="mt-8"> Sign in </Button>
      <Button variant="link" class="w-min mx-auto" as-child>
        <RouterLink :to="{ name: 'signup' }"> Register new account </RouterLink>
      </Button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
</script>
