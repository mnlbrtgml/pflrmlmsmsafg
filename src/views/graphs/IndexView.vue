<template>
  <section class="container pt-10">
    <div
      class="border-neutral-300 bg-neutral-100 text-neutral-700 h-[calc(100vh-9.35rem)] p-4 border rounded-lg row-span-2 flex flex-col gap-4 relative"
    >
      <span
        class="bg-primary text-primary-foreground px-4 py-2 font-bold text-xs uppercase rounded-t-lg absolute left-4 -top-8 z-50"
      >
        Predictions results
      </span>

      <Suspense>
        <ModelView />

        <template #fallback> Loading... </template>
      </Suspense>
    </div>
  </section>
</template>

<script lang="ts" setup>
import ModelView from "@/views/graphs/partials/ModelView.vue";
</script>
