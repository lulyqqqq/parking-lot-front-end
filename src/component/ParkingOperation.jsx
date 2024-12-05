import React, {useContext, useEffect} from 'react';
import {Button, Input, Select} from 'antd';
import axios from 'axios';
import {ParkingLotContext} from '../App';
import {SET_PLATE_NUMBER, SET_STRATEGY, UPDATE_PARKING_LOT} from '../context/ParkingLotContextReducer';

const {Option} = Select;

const ParkingOperation = () => {
    const {state, dispatch} = useContext(ParkingLotContext);
    const {plateNumber, strategy, parkingLots} = state;

    const api = axios.create({
        baseURL: 'http://localhost:8080'
    });

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
    }, []);

    const handlePark = async () => {
        const availableLot = parkingLots.find(lot => lot.availableCapacity > 0);
        if (availableLot) {
            try {
                const parkRequestData = {
                    plateNumber,
                    parkingBoyType: strategy
                };
                const response = await api.post('/park', parkRequestData);
                if (response.status === 200) {
                    const {ticket} = response.data;
                    dispatch({
                        type: UPDATE_PARKING_LOT,
                        payload: {parkingLotId: availableLot.id, ticket}
                    });
                }
            } catch (error) {
                console.error('Error parking car:', error);
            }
        }
    };

    const handleFetch = async () => {
        try {
            const fetchRequestData = {
                plateNumber
            };
            const response = await api.post('/fetch', fetchRequestData);
            if (response.status === 200) {
                const {plateNumber: carPlateNumber} = response.data;
                const parkingLotId = parkingLots.find(lot => lot.tickets.some(ticket => ticket.plateNumber === carPlateNumber))?.id;
                dispatch({
                    type: UPDATE_PARKING_LOT,
                    payload: {parkingLotId, ticket: null}
                });
            }
        } catch (error) {
            console.error('Error fetching car:', error);
        }
    };
    return (
        <div>
            <Input placeholder="Plate Number" value={plateNumber}
                   onChange={e => dispatch({type: SET_PLATE_NUMBER, payload: e.target.value})}/>
            <Select value={strategy} onChange={value => dispatch({type: SET_STRATEGY, payload: value})}>
                <Option value="Standard">Standard</Option>
                <Option value="Smart">Smart</Option>
                <Option value="SuperSmart">SuperSmart</Option>
            </Select>
            <Button type="primary" onClick={handlePark}>
                Park
            </Button>
            <Button type="primary" onClick={handleFetch}>
                Fetch
            </Button>
        </div>
    );
};

export default ParkingOperation;