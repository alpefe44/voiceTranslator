import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    data: []
}

export const dataSlice = createSlice({
    name: 'dataslice',
    initialState,
    reducers: {
        addData: (state, action) => {
            const { word, translation } = action.payload;
            if (state.data.length <= 0) {
                state.data.push(action.payload)
            } else {
                const newState = state.data.filter((item) => item.translation !== translation)
                newState.push(action.payload);
                state.data = newState
            }
            console.log(state.data)
        }
    }
})



export const { addData } = dataSlice.actions;
export default dataSlice.reducer