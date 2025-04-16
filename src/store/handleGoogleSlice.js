import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    load: false,
};

const handleGoogleSlice = createSlice({
    name: 'googleLoad',
    initialState,
    reducers: {
        load: (state) => {
            state.load = true;
        },
        Notload: (state) => {
            state.load = false;
        },
        
    },
});

export const { load , Notload } = handleGoogleSlice.actions;

export default handleGoogleSlice.reducer;