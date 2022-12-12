<script setup lang="ts">
import { watchEffect } from "vue";
import { RouterLink, RouterView } from 'vue-router'
import Auth from './components/Auth.vue'
import { supabase } from './helpers/supabase';
import { store } from './stores/store'


async function logData() {
  const { data, error } = await supabase.auth.getSession()
  console.log(data)
  console.log(store.session)
}

watchEffect(async () => {
  const { data, error } = await supabase.auth.getSession()

  if (data != null) {
    store.session = data
    console.log(store.session)
  }

})

async function signOut() {
  const { error } = await supabase.auth.signOut()
}
</script>

<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" color="white" flat density="compact">
      <v-tabs centered color="grey-darken-2">
        <v-tab>
          <RouterLink to="/">Home</RouterLink>
        </v-tab>
        <v-tab>
          <RouterLink to="/saveweight">Save Weight</RouterLink>
        </v-tab>
        <v-tab>
          <RouterLink to="/showweight">Show Weight History</RouterLink>
        </v-tab>
        <v-tab>
          <Auth />
        </v-tab>
        <v-tab>
          <button @click="signOut">Log Out</button>
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-avatar class="hidden-sm-and-down" color="grey darken-1 shrink" size="32"></v-avatar>
    </v-app-bar>
    <v-main class="grey lighten-3">
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
