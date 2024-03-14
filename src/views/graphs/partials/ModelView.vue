<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
      <p class="font-semibold text-lg">
        Latest predicted weight: {{ predictions[predictions.length - 1]?.predicted_weight }} g
      </p>
      
      <Button @click="getPredictions" class="w-max bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Refresh</Button>
    </div>
    <div v-if="predictions && predictions.length > 0" class="flex-1">
     
      <div class="grid grid-cols-2 gap-4 mt-4">
        <!-- Predicted Weight Chart -->
        <div class="grid place-items-center">
          <Bar :options="chartOptions" :data="predictedWeightChartData" />
        </div>
        <!-- Temperature Chart -->
        <div class="grid place-items-center">
          <Bar :options="chartOptions" :data="temperatureChartData" />
        </div>
        <!-- Turbidity Chart -->
        <div class="grid place-items-center">
          <Bar :options="chartOptions" :data="turbidityChartData" />
        </div>
        <!-- pH Chart -->
        <div class="grid place-items-center">
          <Bar :options="chartOptions" :data="phChartData" />
        </div>
      
      </div>
       <div class="overflow-auto max-h-[29rem]">
        <table class="w-full text-left shadow rounded-lg">
          <thead class="bg-gray-200">
            <tr>
              <th class="px-4 py-2">Timestamp</th>
              <th class="px-4 py-2">Temperature (°C)</th>
              <th class="px-4 py-2">Turbidity (NTU)</th>
              <th class="px-4 py-2">pH</th>
              <th class="px-4 py-2">Predicted Weight (g)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(prediction, index) in predictions" :key="index" :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'">
              <td class="px-4 py-2 border-b">{{ prediction.timestamp }}</td>
              <td class="px-4 py-2 border-b">{{ prediction.TemperatureValue }}</td>
              <td class="px-4 py-2 border-b">{{ prediction.TurbidityValue }}</td>
              <td class="px-4 py-2 border-b">{{ prediction.pHValue }}</td>
              <td class="px-4 py-2 border-b">{{ prediction.predicted_weight }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue';
import { db } from "@/firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
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
import { format } from "date-fns";
import type { ChartOptions } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
  components: {
    Bar,
    Button
  },
  setup() {
    const predictions = ref<any[]>([]);
    const chartOptions : ChartOptions<'bar'> = reactive({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            color: 'rgba(240, 240, 240, 1)',
          },
        },
      },
    });

    const temperatureChartData = reactive(createChartData('Temperature (°C)', 'rgba(255, 99, 132, 0.5)'));
    const turbidityChartData = reactive(createChartData('Turbidity (NTU)', 'rgba(210, 162, 235, 0.5)'));
    const phChartData = reactive(createChartData('pH Level', 'rgba(255, 206, 86, 0.5)'));
    const predictedWeightChartData = reactive(createChartData('Predicted Weight (g)', 'rgba(75, 192, 192, 0.5)'));

    function createChartData(label: string, backgroundColor: string) {
      return {
        labels: [],
        datasets: [{
          label,
          data: [],
          backgroundColor: backgroundColor,
        }],
      };
    }

    async function getPredictions() {
      const predictionsQuery = query(collection(db, "predictions"), orderBy("timestamp"));
      const predictionCollection = await getDocs(predictionsQuery);

      if (predictionCollection) {
        const tempList: any[] = [];
        let timestamps: string[] = [];

        predictionCollection.forEach((doc) => {
          const data = doc.data();
          tempList.push(data);
          timestamps.push(data.timestamp);
        });

        predictions.value = tempList;
        timestamps = predictions.value.map(p => format(new Date(p.timestamp), 'HH:mm'));
        updateChartData(temperatureChartData, timestamps, tempList.map(t => t.TemperatureValue));
        updateChartData(turbidityChartData, timestamps, tempList.map(t => t.TurbidityValue));
        updateChartData(phChartData, timestamps, tempList.map(t => t.pHValue));
        updateChartData(predictedWeightChartData, timestamps, tempList.map(t => t.predicted_weight));
      }
    }

    function updateChartData(chartData: any, labels: string[], data: number[]) {
      chartData.labels = labels;
      chartData.datasets[0].data = data;
    }

    onMounted(async () => {
      await getPredictions();
    });

    return {
      predictions,
      chartOptions,
      temperatureChartData,
      turbidityChartData,
      phChartData,
      predictedWeightChartData,
      getPredictions,
    };
  },
});
</script>

<style scoped>
/* Add additional styling here */
</style>
