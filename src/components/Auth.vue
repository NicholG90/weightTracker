<script setup lang="ts">
import { store } from '../stores/store'
import { supabase } from '../helpers/supabase';


async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    })
}

</script>


<template>
    <div>
        <div>
            <button @click="signInWithGoogle">
                Login with Google
            </button>
        </div>
    </div>
</template>