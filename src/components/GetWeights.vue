<script setup lang="ts">
import { supabase } from '../helpers/supabase';
import { store } from '../stores/store'
import { ref, watchEffect } from 'vue';
import GraphWeights from '../components/GraphWeights.vue';

let d = new Date()
d.setDate(d.getDate() - 7); // subtract 5 days

const initialDate = ref(d.toISOString().split("T")[0]);
const endDate = ref(new Date().toJSON().slice(0, 10));

const userID = store.session.user.id

const getWeightsDB = async () => {
    try {
        const { data, error } = await supabase
            .from('weight-tracker')
            .select('user_id, date, weight, id')
            .eq('user_id', userID)
            .gte('date', initialDate.value)
            .lte('date', endDate.value)
            .order('date')
        store.usersWeightHistory = data
    }
    catch (error) {
        console.log(error)
    }
}
watchEffect(() => {
    getWeightsDB()
})


</script>

<template>
    <v-card>
        <v-card-title>Your Weight History</v-card-title>
        <v-card-text>
            <label htmlFor="initialDate"></label>
            <input type="date" id="initialDate" v-model="initialDate" required />
            <label htmlFor="endDate"></label>
            <input type="date" id="endDate" v-model="endDate" required />
            <GraphWeights />
        </v-card-text>
    </v-card>
</template>