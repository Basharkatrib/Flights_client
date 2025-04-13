import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null ,
};

const idSlice = createSlice({
    name: 'newId',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        
    },
});

export const { setId } = idSlice.actions;

export default idSlice.reducer;