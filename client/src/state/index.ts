import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  isSideBarCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState: InitialState = {
  isSideBarCollapsed: false,
  isDarkMode: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSideBarCollapsed = !state.isSideBarCollapsed;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleDarkMode, toggleSidebar } = globalSlice.actions;

export default globalSlice.reducer;
