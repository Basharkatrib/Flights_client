import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    selectedFlight: [],
};
const flightSelectedSlice = createSlice({
    name: 'flightSelected',
    initialState,
    reducers: {
        setSelectedFlight: (state, action) => {
            const flight = state.selectedFlight.find((item) => item.id === action.payload.id);
            if (flight === undefined) {
                state.selectedFlight.push(action.payload);
            }
        },
        deleteSelectedFlight: (state, action) => {
            state.selectedFlight = state.selectedFlight.filter((item) => item.id !== action.payload.id);
        },
    },
});
export const { setSelectedFlight, deleteSelectedFlight } = flightSelectedSlice.actions;
export default flightSelectedSlice.reducer;