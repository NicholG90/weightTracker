import { Session } from "@supabase/supabase-js"
import { useState, useEffect } from "react"
import Auth from './components/Auth'
import SaveWeight from "./components/SaveWeight"
import GetWeights from "./components/GetWeights"
import { supabase } from './helpers/supabase'

export default function App() {

  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container">
      {!session ?
        <Auth />
        :
        <div>
          <SaveWeight session={session} />
          <GetWeights session={session} />
        </div>
      }

    </div>
  )
}
