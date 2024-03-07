<template>
  <h1 class="text-3xl font-bold underline">Home!</h1>

  <section>
    <p>
      A student researchers of Bachelor of Science in Electronics Engineering at University of Rizal
      System - Morong created a study that adapts the new technology which benefits the aquaculture
      sector.
    </p>

    <p>
      Linear regression is a foundational machine learning model used in various fields, including
      fisheries and aquaculture. Through a smart monitoring system for Ayungin fish growth, linear
      regression helps predict the growth of Ayungin fish based on the following water quality
      parameters data.
    </p>

    <p>
      This model focuses on analyzing the relationship between independent variables like pH level
      and temperature level and the dependent variable, which is the weight of Ayungin fish. By
      monitoring and collecting datasets on the following water quality parameters, the smart
      monitoring system can build a linear regression model to predict how changes in the
      independent variables affect the growth of Ayungin fish.
    </p>
  </section>

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
