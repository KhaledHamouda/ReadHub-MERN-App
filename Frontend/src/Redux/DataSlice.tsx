import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type
// Add other properties as needed
interface UserData {
  img?: string;
  id?: string;
}

interface DataState {
  mode: 'light' | 'dark';
  userData: UserData;
  openDialog: boolean;
  openSearchDialog: boolean;
  loginState: boolean;
  refreshAdmin: number;
  authState: 'signup' | 'login';
}

// Define the initial state
const initialState: DataState = {
  mode: (sessionStorage.getItem('mode') as 'light' | 'dark') || 'light',
  userData: {},
  openDialog: false,
  openSearchDialog: false,
  loginState: (sessionStorage.getItem('loginState') === 'true') || false,
  refreshAdmin: 0,
  authState: 'signup', // Default to 'signup'
};

const DataSlice = createSlice({
  name: 'DataSlice',
  initialState,
  reducers: {
    changeMood: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload === 'light' ? 'dark' : 'light';
      sessionStorage.setItem('mode', state.mode);
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
      // sessionStorage.setItem('img', action.payload.img || '');
      sessionStorage.setItem('id', action.payload.id || '');
    },
    setOpenDialog: (state, action: PayloadAction<boolean>) => {
      state.openDialog = action.payload;
    },
    setOpenSearchDialog: (state, action: PayloadAction<boolean>) => {
      state.openSearchDialog = action.payload;
    },
    setloginState: (state, action: PayloadAction<boolean>) => {
      state.loginState = action.payload;
      sessionStorage.setItem('loginState', String(action.payload));
    },
    setRefreshAdmin: (state, action: PayloadAction<number>) => {
      state.refreshAdmin = action.payload;
    },
    switchToLogin: (state) => {
      state.authState = 'login';
    },
    switchToSignup: (state) => {
      state.authState = 'signup';
    },
  },
});

export const {
  changeMood,
  setUserData,
  setOpenDialog,
  setOpenSearchDialog,
  setloginState,
  setRefreshAdmin,
  switchToLogin,
  switchToSignup,
} = DataSlice.actions;

export default DataSlice.reducer;
