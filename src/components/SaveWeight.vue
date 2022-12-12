<script setup lang="ts">
import { supabase } from '../helpers/supabase';
import { store } from '../stores/store'
import { ref } from 'vue';

const userWeight = ref(0);
const userDate = ref('');


const handleSubmit = () => {
    pushWeightDB();
    alert('Thanks!');
};


const pushWeightDB = async () => {
    try {
        const { data, error } = await supabase
            .from('weight-tracker')
            .insert([
                { weight: userWeight.value, date: userDate.value, userID: store.session.session.user.id }
            ])
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <v-form @submit.prevent="handleSubmit" ref="form">
        <label htmlFor="weightInput"></label>
        <input type="number" step=".1" id="weightInput" v-model="userWeight" required />
        <label htmlFor="dateSelect"></label>
        <input type="date" id="dateSelect" v-model="userDate" required />
        <v-btn type="submit" color="success">Submit</v-btn>
    </v-form>
</template>