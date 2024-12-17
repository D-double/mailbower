import axios from 'axios';
import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import {service} from '../../servis/servis';

export const getEmail = createAsyncThunk('email/getEmail',
  async (_, {getState}) => {
    const { api, domen, selectedService } = getState().email;
    if (selectedService) {
      const results = await axios.get(`https://smsbower.online/api/mail/getActivation?api_key=${api}&service=${selectedService}&domain=${domen}`);    
      const data = results.data
      return data; // Возвращаем все результаты      
    } else {
      return {status: 0, error: ''}
    }
  }
);

// Асинхронное действие для получения данных о ценах для каждого id
export const getPriceCount = createAsyncThunk('email/getPriceCount',
  async (service, {getState}) => {
    const { api, domen } = getState().email;
    const results = await axios.get(`https://smsbower.online/api/mail/getPriceRests?api_key=${api}&service=${service}&domain=${domen}`);
    const data = results.data
    return data; // Возвращаем все результаты
  }
);



const initialState = {
  api: 'JaBasLQyxRLgv3h0RnXMLCZAXaShlynz',
  domen: 'gmail.com',
  email: '',
  mailCodes: null, // Новое поле для хранения кодов
  priceData: null,
  service,
  selectedService: null,
  error: ''
};

// Создание слайса
export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setSelectedService: (state, action) => {
      state.selectedService = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmail.pending, (state) => {
      state.email = '';
      state.mailCodes = null;
      state.error = '';
    });
    builder.addCase(getEmail.fulfilled, (state, action) => {
      const result = action.payload;
      if (result.status) {
        state.email = result.mail;
        state.mailCodes = result.mailId;
      } else {
        let textRu = result.error == 'No mails yet' ? 'Нет доступных почт' : result.error == 'Insufficient balance' ? 'Недостаточно средств' : 'Выберите один из сервисов'
        state.error = textRu;
      }
    });
    builder.addCase(getPriceCount.pending, (state) => {
      state.priceData = null;
      state.error =''
    });
    builder.addCase(getPriceCount.fulfilled, (state, action) => {
      if (!Array.isArray(action.payload.data)) {
        state.priceData = action.payload; // Сохраняем результаты getPriceCount
      } else {
        state.error ='Нет доступных почт'
      }
    });
  }
});

export const {
  setSelectedService
} = emailSlice.actions

export default emailSlice.reducer;