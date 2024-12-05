import './App.css';
import {createContext, useReducer} from "react";
import parkingLotReducer, {initialState} from "./context/ParkingLotContextReducer";
import ParkingLot from "./component/ParkingLot";

export const ParkingLotContext = createContext();

function App() {
    const [state, dispatch] = useReducer(parkingLotReducer, initialState);
    return (
        <div className="App">
            <ParkingLotContext.Provider value={{state, dispatch}}>
                <ParkingLot/>
            </ParkingLotContext.Provider>
        </div>
    );
}

export default App;