export const SET_PARKING_LOTS = 'SET_PARKING_LOTS';
export const SET_PLATE_NUMBER = 'SET_PLATE_NUMBER';
export const SET_STRATEGY = 'SET_STRATEGY';
export const UPDATE_PARKING_LOT = 'UPDATE_PARKING_LOT';

export const initialState = {
    parkingLots: [],
    plateNumber: '',
    strategy: 'Standard'
};

const parkingLotReducer = (state, action) => {
    switch (action.type) {
        case SET_PARKING_LOTS:
            return {
                ...state,
                parkingLots: action.payload
            };
        case SET_PLATE_NUMBER:
            return {
                ...state,
                plateNumber: action.payload
            };
        case SET_STRATEGY:
            return {
                ...state,
                strategy: action.payload
            };
        case UPDATE_PARKING_LOT:
            const { parkingLotId, ticket } = action.payload;
            return {
                ...state,
                parkingLots: state.parkingLots.map(lot => {
                    if (lot.id === parkingLotId) {
                        if (ticket) {
                            return {
                                ...lot,
                                tickets: [...lot.tickets, ticket],
                                availableCapacity: lot.availableCapacity - 1
                            };
                        } else {
                            return {
                                ...lot,
                                tickets: lot.tickets.filter(t => t.plateNumber !== ticket?.plateNumber),
                                availableCapacity: lot.availableCapacity + 1
                            };
                        }
                    }
                    return lot;
                })
            };
        default:
            return state;
    }
};

export default parkingLotReducer;