import React, {useContext} from 'react';
import {ParkingLotContext} from "../App";
import ParkingLotCar from "./ParkingLotCar";

const ParkingLotGroup = () => {
    const {state} = useContext(ParkingLotContext);
    const {parkingLots} = state;

    if (!parkingLots || !Array.isArray(parkingLots)) {
        return <div>No parking lots available</div>;
    }

    return (
        <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
            {parkingLots.map(parkingLot => (
                <ParkingLotCar key={parkingLot.id} parkingLotData={parkingLot}/>
            ))}
        </div>
    );
};

export default ParkingLotGroup;