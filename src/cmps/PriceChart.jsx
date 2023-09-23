import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

export function PriceChart({ toys }) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );


    function getLabelsObjMap(toys) {
        let sumObjMap = {}
        let countObjMap = {}
        toys.map(t => t.labels.forEach(
            label => {
                sumObjMap[label] ? sumObjMap[label] += t.price : sumObjMap[label] = t.price
                countObjMap[label] ? countObjMap[label]++ : countObjMap[label] = 1
            }
        ))

        for (const key in sumObjMap) {
            sumObjMap[key] = sumObjMap[key] / countObjMap[key]
        }

        return sumObjMap
    }

    const labelObjMap = getLabelsObjMap(toys)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                // position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Average toy price by label',
            },
        },
    };

    const labels = Object.keys(labelObjMap)

    const data = {
        labels,
        datasets: [
            {
                label: 'Price',
                data: Object.values(labelObjMap),
                backgroundColor: '#91D6F7',
            },
        ],
    };

    return (
        <Bar options={options} data={data} />
    )
}
