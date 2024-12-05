import React, { useState } from 'react';
import { Button, Input, Select, Space } from 'antd';
import './ParkingLotPage.css';
const { Option } = Select;

const ParkingLot = () => {
    const [thePlazaPark, setThePlazaPark] = useState(Array(9).fill('X'));
    const [officeTowerParking, setOfficeTowerParking] = useState(Array(12).fill('X'));
    const [cityMallGarage, setCityMallGarage] = useState(Array(10).fill('X'));
    const [plateNumber, setPlateNumber] = useState('');
    const [strategy, setStrategy] = useState('');

    const parkingStrategies = ['Standard', 'Smart', 'SuperSmart'];

    const handlePark = () => {
        let selectedLot = [];
        let setSelectedLot;
        if (strategy === 'Standard') {
            selectedLot = [...thePlazaPark];
            setSelectedLot = setThePlazaPark;
        } else if (strategy === 'Smart') {
            selectedLot = [...officeTowerParking];
            setSelectedLot = setOfficeTowerParking;
        } else if (strategy === 'SuperSmart') {
            selectedLot = [...cityMallGarage];
            setSelectedLot = setCityMallGarage;
        }
        const emptyIndex = selectedLot.indexOf('X');
        if (emptyIndex === -1) {
            alert('停车场已满！');
            return;
        }
        selectedLot[emptyIndex] = plateNumber;
        setSelectedLot(selectedLot);
        alert(`停车成功，车牌号：${plateNumber}，停车策略：${strategy}`);
    };

    const handleFetch = () => {
        let selectedLot = [];
        let setSelectedLot;
        if (strategy === 'Standard') {
            selectedLot = [...thePlazaPark];
            setSelectedLot = setThePlazaPark;
        } else if (strategy === 'Smart') {
            selectedLot = [...officeTowerParking];
            setSelectedLot = setOfficeTowerParking;
        } else if (strategy === 'SuperSmart') {
            selectedLot = [...cityMallGarage];
            setSelectedLot = setCityMallGarage;
        }
        const index = selectedLot.indexOf(plateNumber);
        if (index > -1) {
            selectedLot[index] = 'X';
            setSelectedLot(selectedLot);
            alert(`取车成功，车牌号：${plateNumber}`);
        } else {
            alert('未找到该车辆！');
        }
    };

    return (
        <div>
            <h2>Parking Lot 2.0</h2>
            <Input
                placeholder="Plate Number"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
            />
            <Select
                placeholder="Select Parking Strategy"
                value={strategy}
                onChange={(value) => setStrategy(value)}
            >
                {parkingStrategies.map(strategy => (
                    <Option key={strategy} value={strategy}>
                        {strategy}
                    </Option>
                ))}
            </Select>
            <Space>
                <Button type="primary" onClick={handlePark}>
                    Park
                </Button>
                <Button type="danger" onClick={handleFetch}>
                    Fetch
                </Button>
            </Space>
            <h3>The Plaza Park</h3>
            <div className="parking-lot">
                {thePlazaPark.map((plate, index) => (
                    <div key={index} className="parking-spot">{plate}</div>
                ))}
            </div>
            <h3>Office Tower Parking</h3>
            <div className="parking-lot">
                {officeTowerParking.map((plate, index) => (
                    <div key={index} className="parking-spot">{plate}</div>
                ))}
            </div>
            <h3>City Mall Garage</h3>
            <div className="parking-lot">
                {cityMallGarage.map((plate, index) => (
                    <div key={index} className="parking-spot">{plate}</div>
                ))}
            </div>
        </div>
    );
};

export default ParkingLot;