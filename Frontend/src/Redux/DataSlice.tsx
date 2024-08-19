import { createSlice } from "@reduxjs/toolkit";

export const DataSlice = createSlice({
  name: "DataSlice",
  initialState: {
    mode: sessionStorage.getItem('mode') || "light",
    userData: {},
    openDialog: false,
    openSearchDialog: false,
    loginState: sessionStorage.getItem("loginState") || false,
    refreshAdmin: 0,
  },
  reducers: {
    changeMood: (state, action) => {
      state.mode = action.payload === "light" ? "dark" : "light";
      sessionStorage.setItem('mode', state.mode);
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
      sessionStorage.setItem("img", action.payload.img)
      sessionStorage.setItem("id", action.payload.id)
    },
    setOpenDialog: (state, action) => {
      state.openDialog = action.payload;
    },
    setOpenSearchDialog: (state, action) => {
      state.openSearchDialog = action.payload;
    },
    setloginState: (state, action) => {
      state.loginState = action.payload;
    },
    setRefreshAdmin: (state, action) => {
      state.refreshAdmin = action.payload;
    },
  },
});
export const { changeMood, setUserData, setOpenDialog, setloginState, setRefreshAdmin, setOpenSearchDialog } = DataSlice.actions;
export default DataSlice.reducer;