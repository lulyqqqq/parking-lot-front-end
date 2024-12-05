import React from 'react';
import { Card } from 'antd';

const ParkingLotCar = ({ parkingLotData }) => {
    const { name, tickets, capacity } = parkingLotData;

    const parkingSpots = Array.from({ length: capacity }, (_, index) => {
        const parkedCar = tickets.find(ticket => ticket.position === index + 1);
        return parkedCar ? parkedCar.plateNumber : '';
    });

    return (
        <Card title={name} style={{ width: 300 }}>
            {parkingSpots.map((plateNumber, index) => (
                <div key={index} style={{ border: '1px solid black', padding: '10px', margin: '5px' }}>
                    {plateNumber}
                </div>
            ))}
        </Card>
    );
};

export default ParkingLotCar;