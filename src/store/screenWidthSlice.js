import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    screenWidth: null,
};

const screenWidthSlice = createSlice({
    name: 'screenWidth',
    initialState,
    reducers: {
        setWidth: (state, action) => {
            state.screenWidth = action.payload;
        },
        
    },
});

export const { setWidth } = screenWidthSlice.actions;

export default screenWidthSlice.reducer;