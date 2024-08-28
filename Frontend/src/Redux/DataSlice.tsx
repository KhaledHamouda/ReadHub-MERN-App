import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// Define the state types
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
  searchResults: {
    books: any[];
    categories: any[];
    authors: any[];
  };
  searchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  searchError: string | null;
}

// Async thunk to fetch search results
export const fetchSearchResults = createAsyncThunk<any, string>(
  'data/fetchSearchResults',
  async (query: string) => {
    const response = await axiosInstance.get(`/searchApi/search?q=${query}`);
    console.log('Books:', response.data.books);
console.log('Categories:', response.data.categories);
console.log('Authors:', response.data.authors);

    return response.data;
  }
);

// Define the initial state
const initialState: DataState = {
  mode: (sessionStorage.getItem('mode') as 'light' | 'dark') || 'light',
  userData: {},
  openDialog: false,
  openSearchDialog: false,
  loginState: (sessionStorage.getItem('loginState') === 'true') || false,
  refreshAdmin: 0,
  authState: 'signup',
  searchResults: {
    books: [],
    categories: [],
    authors: []
  },
  searchStatus: 'idle',
  searchError: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.searchStatus = 'loading';
        state.searchError = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action: PayloadAction<any>) => {
        state.searchResults = action.payload;
        state.searchStatus = 'succeeded';
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.searchError = action.error.message || 'Failed to fetch search results';
      });
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
