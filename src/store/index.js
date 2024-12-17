import { configureStore } from '@reduxjs/toolkit';
import email from '../store/email/email'; // Исправленный импорт

export const store = configureStore({
  reducer: {
    email, // Указываем редюсер без фигурных скобок
  },
});
