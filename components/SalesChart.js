import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import Chart from 'chart.js/auto';

const EventSource = require('eventsource');

function SalesChart() {
    const [salesData, setSalesData] = useState({});

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8080/venda/events');
        eventSource.onmessage = (event) => {
            let eventData = JSON.parse(event.data);
            let date = eventData.date;
            let quantity = eventData.quantity;
            setSalesData(currentData => {
                return {
                    ...currentData,
                    [date]: { date, quantity }
                };
            });
        };
        return () => {
            eventSource.close();
        }
    }, []);

    const data = {
        labels: Object.keys(salesData),
        datasets: [{
            label: 'Vendas por data',
            data: Object.values(salesData).map(sale => sale.quantity),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    };

    return (
        <div>
            <h1>Vendas em tempo real</h1>
            <Line data={data} />
        </div>
    );
}

export default SalesChart;
