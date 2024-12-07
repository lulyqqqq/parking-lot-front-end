import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

export const getParkingLots = async () => {
    try {
        const response = await api.get('/parkinglots');
        return response.data;
    } catch (error) {
        console.error('Error fetching parking lots:', error);
        throw error;
    }
};

export const parkCar = async (parkRequestData) => {
    try {
        const response = await api.post('/park', parkRequestData);
        return response.data;
    } catch (error) {
        console.error('Error parking car:', error);
        throw error;
    }
};

export const fetchCar = async (fetchRequestData) => {
    try {
        const response = await api.post('/fetch', fetchRequestData);
        return response.data;
    } catch (error) {
        console.error('Error fetching car:', error);
        throw error;
    }
};