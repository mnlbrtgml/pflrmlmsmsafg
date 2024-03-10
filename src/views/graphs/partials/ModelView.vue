<template>
  <div class="flex items-center justify-between">
    <p class="font-semibold">Latest predicted weight: {{ predictions[predictions.length - 1] }}</p>

    <Button @click="getPredictions" class="w-max ml-auto">Refresh</Button>
  </div>

  <div v-if="predictions" class="flex-1 grid grid-cols-2 gap-4">
    <ul class="max-h-[29rem] overflow-y-auto">
      <li v-for="(prediction, index) in predictions" :key="index" class="px-4 py-2">
        Prediction #{{ index + 1 }}: {{ prediction }}
      </li>
    </ul>

    <div class="grid place-items-center">
      <Bar :options="chartOptions" :data="chartData" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { ref, reactive } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import Button from "@/components/ui/button/Button.vue";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
const chartOptions = { responsive: true };
const predictions = ref<number[]>([0]);
const chartData = reactive({
  labels: [0, 50, 100, 150, 200, 250, 300, 350, 400],
  datasets: [{ data: [...predictions.value], label: "Predicted Weight" }],
});

async function getPredictions(): Promise<void> {
  const predictionCollection = await getDocs(collection(db, "predictions"));

  if (predictionCollection) {
    predictions.value = [0];

    predictionCollection.forEach((document) => {
      predictions.value.push(document.data()["predicted_weight"]);
    });
  }
}

await getPredictions();
</script>
