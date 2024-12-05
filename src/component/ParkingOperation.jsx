import React, {useContext} from 'react';
import {Button, Input, Modal, Select} from 'antd';
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
            } finally {
                dispatch({type: SET_PLATE_NUMBER, payload: ''});
                await getParkingLots()
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
        } finally {
            dispatch({type: SET_PLATE_NUMBER, payload: ''});
            await getParkingLots()
        }
    };

    const getParkingLots = async () => {
        try {
            const response = await api.get('/parkinglots');
            dispatch({type: 'SET_PARKING_LOTS', payload: response.data});
        } catch (error) {
            console.error('Error fetching parking lots:', error);
        }
    }
    return (
        <div>
            <span>请输入车牌号: </span>
            <Input placeholder="Plate Number" value={plateNumber} style={{width: '250px', marginRight: '20px'}}
                   onChange={e => dispatch({type: SET_PLATE_NUMBER, payload: e.target.value})}/>
            <Select value={strategy} onChange={value => dispatch({type: SET_STRATEGY, payload: value})}
                    style={{marginRight: '25px', width: '200px'}}>
                <Option value="Standard">Standard</Option>
                <Option value="Smart">Smart</Option>
                <Option value="SuperSmart">SuperSmart</Option>
            </Select>
            <Button type="primary" onClick={() => {
                Modal.confirm({
                    title: 'Confirm',
                    content: 'Are you sure you want to park the car?',
                    onOk: handlePark
                });
            }} style={{marginRight: '20px'}}>
                Park
            </Button>
            <Button type="primary" onClick={() => {
                Modal.confirm({
                    title: 'Confirm',
                    content: 'Are you sure you want to fetch the car?',
                    onOk: handleFetch
                });
            }}>
                Fetch
            </Button>
        </div>
    );
};

export default ParkingOperation;