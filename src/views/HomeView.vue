<script setup lang="ts">
import { store } from '../stores/store'
import { watchEffect, ref } from "vue";
import GetWeights from '../components/GetWeights.vue';
import SaveWeight from '../components/SaveWeight.vue';

const userWeightChange = ref()
const user = ref()

const calculateWeightChange = () => {
  console.log(store.userLastWeekWeight)
  const firstWeight = store.userLastWeekWeight.at(0).weight
  const secondWeight = store.userLastWeekWeight.at(-1).weight
  userWeightChange.value = parseInt((firstWeight - secondWeight).toFixed(2))
}

watchEffect(() => {
  if (store.userLastWeekWeight.length > 0) {
    user.value = store.session.user
    calculateWeightChange()
  }
})
</script>

<template>
  <div v-if="user" class="d-flex flex-column flex-lg-row">
    <v-card class="ma-5">
      <v-img class="align-end text-white" height="200"
        src="https://i.pinimg.com/564x/3f/24/cb/3f24cbb55dd9b10e36ed29c2dcbe2fcb.jpg" cover>
        <v-card-title>Welcome Back {{ user.user_metadata.full_name }}</v-card-title>
      </v-img>
      <v-card-text>You've lost {{ userWeightChange }} lbs in the past week!</v-card-text>
      <!-- <v-card-actions>
        <v-btn>
          Save Weight
        </v-btn>
        <v-btn>
          View Weight History
        </v-btn>
      </v-card-actions> -->
    </v-card>
    <SaveWeight class="ma-5" />
    <GetWeights class="ma-5" />
  </div>
  <v-container v-else>
    <v-card>
      Please Login!
    </v-card>
  </v-container>
</template>
