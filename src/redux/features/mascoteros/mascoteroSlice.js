import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mascoteros: [],
};

export const mascoteroSlice = createSlice({
  name: 'mascoteros',
  initialState,
  reducers: {
    addMascotero: (state, action) => {
      state.mascoteros.push(action.payload);
    },
    editMascotero: (state, action) => {
      const { id, nombre, apellido, email } = action.payload;
      const existingMascotero = state.mascoteros.find((mascotero) => mascotero.id === id);
      if (existingMascotero) {
        existingMascotero.nombre = nombre;
        existingMascotero.apellido = apellido;
        existingMascotero.email = email;
      }
    },
    removeMascotero: (state, action) => {
      state.mascoteros = state.mascoteros.filter((mascotero) => mascotero.id !== action.payload);
    },
  },
});

export const { addMascotero, editMascotero, removeMascotero } = mascoteroSlice.actions;

export default mascoteroSlice.reducer;
