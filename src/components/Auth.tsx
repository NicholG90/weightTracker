import { useState } from 'react'
import { supabase } from '../helpers/supabase'

export default function Auth() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }

    return (
        <div>
            <div>
                <h1>Login</h1>
                <button onClick={signInWithGoogle} >
                    Login with Google
                </button>
            </div>
        </div>
    )
}