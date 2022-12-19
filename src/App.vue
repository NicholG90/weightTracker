<script setup lang="ts">
import { watchEffect, ref } from "vue";
import { RouterLink, RouterView } from 'vue-router'
import Auth from './components/Auth.vue'
import { supabase } from './helpers/supabase';
import { store } from './stores/store'

const drawer = ref()
const getWeightsDB = async () => {

  let d = new Date()
  d.setDate(d.getDate() - 7);

  const initialDate = ref(d.toISOString().split("T")[0]);
  const endDate = ref(new Date().toJSON().slice(0, 10));

  const userID = store.session.user.id
  if (userID) {
    try {
      const { data, error } = await supabase
        .from('weight-tracker')
        .select('user_id, date, weight, id')
        .eq('user_id', userID)
        .gte('date', initialDate.value)
        .lte('date', endDate.value)
        .order('date')
      store.userLastWeekWeight = data
    }
    catch (error) {
      console.log(error)
    }
  }
}


watchEffect(async () => {
  const { data, error } = await supabase.auth.getSession()
  if (data.session != null) {
    store.session = data.session
    getWeightsDB()
  }
})


async function signOut() {
  const { error } = await supabase.auth.signOut()
}
</script>

<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item>
          <RouterLink to="/">Home</RouterLink>
        </v-list-item>
        <v-list-item>
          <RouterLink to="/saveweight">Save Weight</RouterLink>
        </v-list-item>
        <v-list-item>
          <RouterLink to="/showweight">Show Weight History</RouterLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar class="px-3" color="primary" flat density="compact">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Weight Tracker</v-app-bar-title>
      <v-spacer></v-spacer>
      <Auth v-if="store.session === null" />
      <div v-if="store.session !== null">
        <v-avatar class="hidden-sm-and-down" color="grey-darken-1" size="32">
          <!-- <v-img alt="Avatar" :src="store.session.user.user_metadata.avatar_url"></v-img> -->
        </v-avatar>
        <button @click="signOut">Log Out</button>
      </div>
    </v-app-bar>
    <v-main class="bg-grey-lighten-3">
      <v-container class="mt-5 d-flex justify-center">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
