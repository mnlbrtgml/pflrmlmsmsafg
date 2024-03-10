<template>
  <div class="flex items-center justify-between">
    <p class="font-semibold">
      Latest predicted weight: {{ predictions[predictions.length - 1].weight }}
    </p>

    <Button @click="getPredictions" class="w-max ml-auto">Refresh</Button>
  </div>

  <div v-if="predictions" class="flex-1 grid grid-cols-2 gap-4">
    <ul class="max-h-[29rem] overflow-y-auto">
      <li v-for="(prediction, index) in predictions" :key="index" class="px-4 py-2">
        Prediction #{{ prediction.count }}: {{ prediction.weight }}
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

const predictions = ref([{ count: 0, weight: 1000 }]);
const chartOptions = { responsive: true };
const chartData = reactive({
  labels: [1000],
  datasets: [{ label: "Predicted Weight", data: [0] }],
});

async function getPredictions(): Promise<void> {
  const predictionCollection = await getDocs(collection(db, "predictions"));

  if (predictionCollection) {
    predictions.value = [{ count: 0, weight: 1000 }];

    const tempList: { count: number; weight: number }[] = [];

    predictionCollection.forEach((document) => {
      tempList.push({
        count: Number(document.id.slice(document.id.lastIndexOf("_") + 1)),
        weight: document.data()["predicted_weight"],
      });
    });

    predictions.value = tempList.sort((a, b) => a.count - b.count);
    chartData.labels = predictions.value.map((prediction) => prediction.count);
    chartData.datasets[0].data = predictions.value.map((prediction) => prediction.weight);
  }
}

await getPredictions();
</script>
