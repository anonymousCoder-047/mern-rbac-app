import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";
import themeSettingSlice from "./themeSettingSlice";

const store = configureStore({
  reducer: {
    commonSlice: commonSlice,
    themeSetting: themeSettingSlice,
  },
});

export default store;
