import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SearchState } from "@/types/feed";
import type { UnifiedContentItem } from "@/types/content";

const initialState: SearchState = {
  query: "",
  results: [],
  status: "idle",
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },

    setResults(
      state,
      action: PayloadAction<UnifiedContentItem[]>,
    ) {
      state.results = action.payload;
      state.status = "succeeded";
      state.error = null;
    },

    setStatus(
      state,
      action: PayloadAction<SearchState["status"]>,
    ) {
      state.status = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    clearSearch() {
      return initialState;
    },
  },
});

export const {
  setQuery,
  setResults,
  setStatus,
  setError,
  clearSearch,
} = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
