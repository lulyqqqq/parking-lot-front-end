import React, {useContext, useEffect} from 'react';
import axios from 'axios';
import ParkingOperation from './ParkingOperation';
import ParkingLotGroup from './ParkingLotGroup';
import {ParkingLotContext} from "../App";

const ParkingLot = () => {

    const {dispatch} = useContext(ParkingLotContext);

    useEffect(() => {
        axios.get('http://localhost:8080/parkinglots')
            .then(response => {
                const action = {
                    type: 'SET_PARKING_LOTS',
                    payload: response.data
                };
                dispatch(action);
            })
            .catch(error => {
                console.error('Error fetching parking lots:', error);
            });
    }, [dispatch]);

    return (
        <div>
            <ParkingOperation/>
            <ParkingLotGroup/>
        </div>
    );
};

export default ParkingLot;