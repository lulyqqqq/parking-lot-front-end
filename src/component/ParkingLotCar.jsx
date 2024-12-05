import React from 'react';
import { Card } from 'antd';

const ParkingLotCar = ({ parkingLotData }) => {
    const { name, tickets, capacity } = parkingLotData;

    const parkingSpots = Array.from({ length: capacity }, (_, index) => {
        const parkedCar = tickets.find(ticket => ticket.position === index + 1);
        return parkedCar ? parkedCar.plateNumber : '';
    });

    return (
        <Card title={name} style={{ width: 600}}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {parkingSpots.map((plateNumber, index) => (
                    <div key={index} style={{ border: '1px solid black', padding: '10px', margin: '5px', width: '20%' }}>
                        {plateNumber}
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default ParkingLotCar;