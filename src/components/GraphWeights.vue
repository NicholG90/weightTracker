<script lang="ts">
import { store } from '../stores/store'
import { ref, watchEffect } from "vue";
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

let weightData: any = null
let userWeights: any
let userDates: any

watchEffect(async () => {
    weightData = store.usersWeightHistory

    const mappedWeights = weightData.map((x: any) => {
        return { x: x.date, y: x.weight, key: x.id }
    })
    userWeights = mappedWeights
    const mappedDates = weightData.map((x: any) => {
        return x.date
    })
    userDates = mappedDates
})


export default {
    name: 'BarChart',
    components: { Line },
    data() {
        return {
            chartData: {
                labels: userDates,
                datasets: [
                    {
                        data: userWeights
                    }
                ],
            },
            chartOptions: {
                responsive: true
            }
        }
    }
}


</script>

<template>
    <div v-if="weightData">
        <!-- <Line id="my-chart-id" :options="chartOptions" :data="chartData" /> -->
    </div>
    <div v-else>Loading</div>
</template>