import React, {useContext, useEffect} from 'react';
import ParkingOperation from './ParkingOperation';
import ParkingLotGroup from './ParkingLotGroup';
import {ParkingLotContext} from "../App";
import {getParkingLots} from "../api/parkingLot";

const ParkingLot = () => {

    const {dispatch} = useContext(ParkingLotContext);

    useEffect(() => {
        getParkingLots()
            .then(response => {
                const action = {
                    type: 'SET_PARKING_LOTS',
                    payload: response
                };
                dispatch(action);
            })
    }, [dispatch]);

    return (
        <div style={{marginTop: '150px'}}>
            <h1>ParkingLot2.0</h1>
            <ParkingOperation/>
            <ParkingLotGroup/>
        </div>
    );
};

export default ParkingLot;