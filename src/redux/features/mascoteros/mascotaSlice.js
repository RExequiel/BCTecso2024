import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mascotas: [],
};

export const mascotaSlice = createSlice({
  name: 'mascotas',
  initialState,
  reducers: {
    addMascota: (state, action) => {
      state.mascotas.push(action.payload);
    },
    editMascota: (state, action) => {
      const { id, nombre, especie } = action.payload;
      const existingMascota = state.mascotas.find((mascota) => mascota.id === id);
      if (existingMascota) {
        existingMascota.nombre = nombre;
        existingMascota.especie = especie;
      }
    },
    removeMascota: (state, action) => {
      state.mascotas = state.mascotas.filter((mascota) => mascota.id !== action.payload);
    },
  },
});

export const { addMascota, editMascota, removeMascota } = mascotaSlice.actions;

export default mascotaSlice.reducer;