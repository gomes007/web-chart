import React, { useState, useEffect } from 'react';

const EventSource = require('eventsource');

function Sales() {
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

    return (
        <div>
            <h1>Vendas em tempo real</h1>
            <table>
                <thead>
                <tr>
                    <th>Data</th>
                    <th>Quantidade de vendas</th>
                </tr>
                </thead>
                <tbody>
                {Object.values(salesData).map((data, index) => (
                    <tr key={index}>
                        <td>{data.date}</td>
                        <td>{data.quantity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Sales;
