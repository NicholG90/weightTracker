import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from '../helpers/supabase'
import GraphWeights from "./GraphWeights";

function GetWeights({ session }: { session: Session }) {
    let d = new Date()
    d.setDate(d.getDate() - 7); // subtract 5 days
    const [usersWeightHistory, setUserWeightHistory] = useState<any>()
    const [initialDate, setInitialDate] = useState<any>(d.toISOString().split("T")[0])
    const [endDate, setEndDate] = useState<any>(new Date().toJSON().slice(0, 10))

    const userID = session.user.id

    useEffect(() => {
        getWeightsDB()
    }, [initialDate, endDate])

    const getWeightsDB = async () => {
        try {
            const { data, error } = await supabase
                .from('weight-tracker')
                .select('userID, date, weight, id')
                .eq('userID', userID)
                .gte('date', initialDate)
                .lte('date', endDate)
                .order('date')
            setUserWeightHistory(data)
        }
        catch (error) {
            console.log(error)
        } finally {
            console.log('complete')
        }
    }

    const handleInitialDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInitialDate(e.target.value)
    }
    const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value)
    }

    return (
        <div>
            <label htmlFor="initialDate"></label>
            <input type="date" id="initialDate" onChange={handleInitialDate} value={initialDate} required />
            <label htmlFor="endDate"></label>
            <input type="date" id="endDate" onChange={handleEndDate} value={endDate} required />
            <GraphWeights data={usersWeightHistory} />
        </div>
    )
}

export default GetWeights