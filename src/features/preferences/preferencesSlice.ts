import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_PREFERENCES } from "@/lib/constants";
import type { UserPreferences } from "@/types/user";
import type { ContentCategory, ContentType } from "@/types/content";

const initialState: UserPreferences = {
  ...DEFAULT_PREFERENCES,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setCategories(
      state,
      action: PayloadAction<ContentCategory[]>,
    ) {
      state.categories = action.payload;
    },

    toggleCategory(
      state,
      action: PayloadAction<ContentCategory>,
    ) {
      const index = state.categories.indexOf(action.payload);

      if (index >= 0) {
        state.categories.splice(index, 1);
      } else {
        state.categories.push(action.payload);
      }
    },

    setContentTypes(
      state,
      action: PayloadAction<ContentType[]>,
    ) {
      state.contentTypes = action.payload;
    },

    toggleContentType(
      state,
      action: PayloadAction<ContentType>,
    ) {
      const index = state.contentTypes.indexOf(action.payload);

      if (index >= 0) {
        state.contentTypes.splice(index, 1);
      } else {
        state.contentTypes.push(action.payload);
      }
    },

    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },

    updatePreferences(
      state,
      action: PayloadAction<Partial<UserPreferences>>,
    ) {
      Object.assign(state, action.payload);
    },

    resetPreferences() {
      return {
        ...DEFAULT_PREFERENCES,
      };
    },
  },
});

export const {
  setCategories,
  toggleCategory,
  setContentTypes,
  toggleContentType,
  setDarkMode,
  updatePreferences,
  resetPreferences,
} = preferencesSlice.actions;

export const preferencesReducer = preferencesSlice.reducer;
