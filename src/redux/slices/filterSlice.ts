import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeIndexCategory: 0,
  activeIndexSort: 0,
  itemCount: 8,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveIndexCategory(state, action) {
      state.activeIndexCategory = action.payload;
    },
    setActiveIndexSort(state, action) {
      state.activeIndexSort = action.payload;
    },
    setItemCount(state) {
      state.itemCount += 8;
    },
  },
});

export const { setActiveIndexCategory, setActiveIndexSort, setItemCount } = filterSlice.actions;

export default filterSlice.reducer;
