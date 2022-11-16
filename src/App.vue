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
  <header>
    <div class="wrapper">
      <Auth />
      <button @click="logData">Console Log Session</button>
      <button @click="signOut">Log Out</button>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/saveweight">Save Weight</RouterLink>
        <RouterLink to="/showweight">Show Weight History</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>
