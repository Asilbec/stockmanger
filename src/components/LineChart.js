import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);




function LineChart(props) {
    const [chartData, addData] = useState([])
    const [label, newlabel] = useState([])
    const [vis, newVis] = useState(false)
    const [style, newStyle] = useState(1)
    useEffect(() => {

        if (props.type === 'preview') {
            axios.get('https://financialmodelingprep.com/api/v3/historical-chart/4hour/' + props.stock + '?serietype=line&timeseries=10&apikey=9cbd888276f170c52ac74137377dd93f').then(function (results) {
                console.log(results.data)
                for (let x = (results.data).length - 1; 0 <= x; x--) {
                    const closeprice = results.data[x]
                    addData(chartData => [...chartData, closeprice.close]);
                    newlabel(label => [...label, (closeprice.date)]);
                    newStyle(1)
                    setTimeout(() => { newVis(true) }, 500)
                }
            })
        } else {
            axios.get('https://financialmodelingprep.com/api/v3/historical-chart/1hour/' + props.stock + '?serietype=line&timeseries=10&apikey=9cbd888276f170c52ac74137377dd93f').then(function (results) {
                for (let x = (results.data).length - 1; 0 <= x; x--) {
                    const closeprice = results.data[x]
                    addData(chartData => [...chartData, closeprice.close]);
                    newlabel(label => [...label, (closeprice.date)]);
                    newStyle(4)
                    setTimeout(() => { newVis(true) }, 500)
                }
            })
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    const options = {
        elements: {
            point: {
                radius: style,
                pointStyle: 'rectRot',
                borderColor: '#808080',
                backgroundColor: '#808080',
                borderWidth: 1
            },
            line: {
                tension: 0.5
            }

        },
        layout: {
            padding: 1
        },

        scales: {
            x: {

                grid: {
                    color: '#0000ffff',
                    borderColor: 'grey',
                    tickColor: 'grey',
                    display: false
                },
                ticks: {
                    font: {
                        size: 0
                    },
                    autoSkip: true,
                    maxTicksLimit: 10,
                    mirror: true,
                }
            },
            y: {
                grid: {
                    color: '#0000ffff',
                    borderColor: 'grey',
                    tickColor: 'grey',
                    display: false
                },
                ticks: {
                    font: {
                        size: 0
                    },
                    autoSkip: true,
                    maxTicksLimit: 10,


                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            title: {
                display: true,
                text: props.stock + "'s closing price",
            },
        },
    };
    const labels = (label)
    const data = {
        labels,
        datasets: [
            {
                label: props.stock,
                data: (chartData),
                borderColor: props.color,
                backgroundColor: 'rgba(255, 99, 132, 0.0)',
            },
        ],
    };

    if (vis === true) {
        return (
            <motion.div animate={{ opacity: 1, height: 'fit-content' }} className='lineChart'>
                <Line className='chart' options={options} data={data} />
            </motion.div>
        )
    } else {
        return (
            <></>
        )
    }


}

export default LineChart;
