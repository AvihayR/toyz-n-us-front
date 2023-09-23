import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


export function StockPieChart({ toys }) {
    ChartJS.register(ArcElement, Tooltip, Legend);

    function getLabelsObjMap(toys) {
        let labelsObjMap = {}
        toys.map(t => t.labels.forEach(
            label => labelsObjMap[label] ? labelsObjMap[label]++ : labelsObjMap[label] = 1
        ))
        return labelsObjMap
    }

    const labelObjMap = getLabelsObjMap(toys)

    const data = {
        labels: Object.keys(labelObjMap),
        datasets: [
            {
                label: 'In stock',
                data: Object.values(labelObjMap),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(117, 225, 115, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(155, 239, 64, 1)',
                ],
                borderWidth: 0.7,
            },
        ],
    };

    return (
        <>
            <h2>Toys in stock by labels</h2>
            <Doughnut data={data} />
        </>
    )
}