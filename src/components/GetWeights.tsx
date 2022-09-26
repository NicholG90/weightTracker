import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from '../helpers/supabase'

function GetWeights({ session }: { session: Session }) {
    const userID = session.user.id

    useEffect(() => {
        getWeightsDB()
    }, [])

    const getWeightsDB = async () => {
        try {
            const { data, error } = await supabase
                .from('weight-tracker')
                .select('userID, date, weight')
                .eq('userID', userID)
                .order('date')
            console.log(data)
        }
        catch (error) {
            console.log(error)
        } finally {
            console.log('complete')
        }
    }
    return (
        <div>GetWeights</div>
    )
}

export default GetWeights