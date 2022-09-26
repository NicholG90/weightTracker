import { useEffect, useState, useRef, MouseEvent } from "react";
import { Line, getElementsAtEvent } from 'react-chartjs-2';
import 'chart.js/auto';
import type { InteractionItem } from 'chart.js';
import { supabase } from '../helpers/supabase'




function GraphWeights({ data }: any) {
    const [userWeights, setUserWeights] = useState([])
    const [userDates, setUserDates] = useState([])
    const chartRef = useRef<HTMLCanvasElement | any>(null)

    useEffect(() => {
        if (data) {
            const mappedWeights = data.map((x: any) => {
                return { x: x.date, y: x.weight, key: x.id }
            })
            console.log(mappedWeights)
            setUserWeights(mappedWeights)
            const mappedDates = data.map((x: any) => {
                return x.date
            })
            setUserDates(mappedDates)
        }
    }, [data])

    const chartData = {
        labels: userDates,
        datasets: [
            {
                data: userWeights
            }
        ],

    }

    const printElementAtEvent = (element: InteractionItem[]) => {
        if (!element.length) return;

        const { datasetIndex, index } = element[0];
        deleteWeight(chartData.datasets[datasetIndex].data[index])
    };

    const deleteWeight = async (id: any) => {
        try {
            const { data, error } = await supabase
                .from('weight-tracker')
                .delete()
                .match({ id: id.key })
        } catch (error) {
            console.log(error)
        }
    }

    const chartClick = (event: MouseEvent<HTMLCanvasElement>) => {
        const { current: chart } = chartRef;

        if (!chart) {
            return;
        }

        printElementAtEvent(getElementsAtEvent(chart, event));
    };



    return (
        data ?
            <Line
                datasetIdKey='id'
                data={chartData}
                ref={chartRef}
                onClick={chartClick}
            />
            :
            null
    )
}

export default GraphWeights