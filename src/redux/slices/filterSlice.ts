import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type FilterSliceState = {
  activeIndexCategory: number;
  activeIndexSort: number;
  itemCount: number;
};
const initialState: FilterSliceState = {
  activeIndexCategory: 0,
  activeIndexSort: 0,
  itemCount: 8,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveIndexCategory(state, action: PayloadAction<number>) {
      state.activeIndexCategory = action.payload;
    },
    setActiveIndexSort(state, action: PayloadAction<number>) {
      state.activeIndexSort = action.payload;
    },
    setItemCount(state) {
      state.itemCount += 8;
    },
  },
});

export const { setActiveIndexCategory, setActiveIndexSort, setItemCount } = filterSlice.actions;

export default filterSlice.reducer;
