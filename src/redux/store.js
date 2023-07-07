import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    phone: null,
    email: null,
    Name: null,
    Nickname: null,
    Sername: null,
    Sex: null,
    Advantages: [],
    Checkbox: [],
    RadioGroup: null,
    about: null,
  },
};

const dataSlice = createSlice({
  name: "dataForm",
  initialState,
  reducers: {
    saveDataPhone(state, actions) {
      state.data.phone = actions.payload;
    },

    saveDataEmail(state, actions) {
      state.data.email = actions.payload;
    },
    saveDataNickname(state, actions) {
      state.data.Nickname = actions.payload;
    },
    saveDataName(state, actions) {
      state.data.Name = actions.payload;
    },
    saveDataSername(state, actions) {
      state.data.Sername = actions.payload;
    },
    saveDataSex(state, actions) {
      state.data.Sex = actions.payload;
    },
    saveDataAdvantages(state, actions) {
      state.data.Advantages = actions.payload;
    },
    saveDataCheckbox(state, actions) {
      state.data.Checkbox = [actions.payload];
    },
    saveDataRadioGroup(state, actions) {
      state.data.RadioGroup = actions.payload;
    },
    saveDataAbout(state, actions) {
      state.data.about = actions.payload;
    },
  },
});

export const store = configureStore({
  reducer: { dataForm: dataSlice.reducer },
});

export const dataFormAction = dataSlice.actions;
