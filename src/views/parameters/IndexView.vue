<template>
  <section class="container pt-10">
    <div
      class="border-neutral-300 bg-neutral-100 text-neutral-700 h-[calc(100vh-9.35rem)] p-4 border rounded-lg row-span-2 flex flex-col gap-4 relative"
    >
      <span
        class="bg-primary text-primary-foreground px-4 py-2 font-bold text-xs uppercase rounded-t-lg absolute left-4 -top-8 z-50"
      >
        Parameter values
      </span>

      <Button @click="handleFeedingToggling" class="w-max mr-auto"
        >Feeding System Activation</Button
      >

      <div class="flex-1 grid grid-cols-2 gap-2">
        <div
          class="border-sky-300 bg-sky-100 text-sky-600 p-4 border rounded-lg flex flex-col items-center justify-center gap-4"
        >
          <p class="text-xl font-bold uppercase">Feeding System</p>
          <p class="bg-sky-600 text-primary-foreground px-4 py-2 text-4xl rounded-lg">
            {{ sensorValues.FeedingTime ? "ON" : "OFF" }}
          </p>
        </div>

        <div
          class="border-amber-300 bg-amber-100 text-amber-600 p-4 border rounded-lg flex flex-col items-center justify-center gap-4"
        >
          <p class="text-xl font-bold uppercase">Temperature</p>
          <p class="bg-amber-600 text-primary-foreground px-4 py-2 text-4xl rounded-lg">
            {{ sensorValues.TemperatureValue }}
          </p>
        </div>

        <div
          class="border-fuchsia-300 bg-fuchsia-100 text-fuchsia-600 p-4 border rounded-lg flex flex-col items-center justify-center gap-4"
        >
          <p class="text-xl font-bold uppercase">Turbidity</p>
          <p class="bg-fuchsia-600 text-primary-foreground px-4 py-2 text-4xl rounded-lg">
            {{ sensorValues.TurbidityValue }}
          </p>
        </div>

        <div
          class="border-emerald-300 bg-emerald-100 text-sky-600 p-4 border rounded-lg flex flex-col items-center justify-center gap-4"
        >
          <p class="text-xl font-bold uppercase">PH</p>
          <p class="bg-emerald-600 text-primary-foreground px-4 py-2 text-4xl rounded-lg">
            {{ sensorValues.pHValue }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { ref as useRtdbRef, onValue, set } from "firebase/database";
import { rtdb } from "@/firebase/config";
import Button from "@/components/ui/button/Button.vue";

const rtdbRef = useRtdbRef(rtdb, "/SensorValues");
const sensorValues = reactive({
  FeedingTime: false,
  TemperatureValue: 0,
  TurbidityValue: 0,
  pHValue: 0,
});

function handleFeedingToggling(): void {
  sensorValues.FeedingTime = !sensorValues.FeedingTime;

  set(rtdbRef, {
    ...sensorValues,
  });
}

onValue(rtdbRef, (snapshot) => {
  const sensor = snapshot.val();

  sensorValues.FeedingTime = sensor.FeedingTime;
  sensorValues.TemperatureValue = sensor.TemperatureValue;
  sensorValues.TurbidityValue = sensor.TurbidityValue;
  sensorValues.pHValue = sensor.pHValue;
});
</script>
