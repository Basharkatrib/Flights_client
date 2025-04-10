import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    selectedFlight: [],
};
const flightSelectedSlice = createSlice({
    name: 'flightSelected',
    initialState,
    reducers: {
        setSelectedFlight: (state, action) => {
            state.selectedFlight = [];
            state.selectedFlight.push(action.payload);
        },
        deleteSelectedFlight: (state, action) => {
            state.selectedFlight = [];
        },
    },
});
export const { setSelectedFlight, deleteSelectedFlight } = flightSelectedSlice.actions;
export default flightSelectedSlice.reducer;