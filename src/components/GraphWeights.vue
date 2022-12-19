<script lang="ts">
import { store } from '../stores/store'
import { Line } from 'vue-chartjs'
import 'chart.js/auto'

export default {
    name: 'BarChart',
    components: { Line },
    computed: {
        chartData() {
            return { labels: this.userDates, datasets: [{ data: this.userWeights }] }
        },
        chartOptions() {
            return {
                responsive: true
            }
        },
        weightData() {
            return store.usersWeightHistory
        },
        userWeights() {
            return this.weightData.map(function (x: any) {
                return x.weight
            })
        },
        userDates() {
            return this.weightData.map(function (x: any) {
                return x.date
            })
        }
    },
}
</script>

<template>
    <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>