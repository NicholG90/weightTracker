import { Session } from "@supabase/supabase-js";
import { useState } from "react";
import { supabase } from '../helpers/supabase'


function SaveWeight({ session }: { session: Session }) {
    const [userWeight, setUserWeight] = useState(0)
    const [userDate, setUserDate] = useState('');


    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserWeight(parseFloat(e.target.value))
    }
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDate(e.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        pushWeightDB();
        alert('Thanks!')
    }

    const pushWeightDB = async () => {
        try {
            const { data, error } = await supabase
                .from('weight-tracker')
                .insert([
                    { weight: userWeight, date: userDate, userID: session.user.id }
                ])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="weightInput"></label>
            <input type="number" step=".1" id="weightInput" onChange={handleWeightChange} value={userWeight} required />
            <label htmlFor="dateSelect"></label>
            <input type="date" id="dateSelect" onChange={handleDateChange} value={userDate} required />
            <button>Submit</button>
        </form>

    )
}

export default SaveWeight