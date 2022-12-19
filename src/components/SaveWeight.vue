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
                { weight: userWeight.value, date: userDate.value, user_id: store.session.user.id }
            ])
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <v-card class="w-auto">
        <v-img class="align-end text-white" height="300"
            src="https://www.shutterstock.com/image-vector/feet-on-weighing-scales-overweight-600w-1080187154.jpg"
            cover>
            <v-card-title>Save a Weight</v-card-title>
        </v-img>
        <v-card-text>
            <v-form @submit.prevent="handleSubmit" ref="form" class="d-flex flex-column justify-space-between">
                <label htmlFor="weightInput"></label>
                <input type="number" step=".1" id="weightInput" v-model="userWeight" required class="py-5" />
                <label htmlFor="dateSelect"></label>
                <input type="date" id="dateSelect" v-model="userDate" required class="py-5" />
                <v-card-actions>
                    <v-btn type="submit" color="success">Submit</v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</template>