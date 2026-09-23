import { describe, expect, it } from "vitest";
import {
  preferencesReducer,
  toggleCategory,
  toggleContentType,
  setDarkMode,
  resetPreferences,
} from "./preferencesSlice";
import { DEFAULT_PREFERENCES } from "@/lib/constants";

describe("preferencesSlice", () => {
  it("toggles a category on", () => {
    const state = preferencesReducer(
      DEFAULT_PREFERENCES,
      toggleCategory("sports"),
    );

    expect(state.categories).toContain("sports");
  });

  it("toggles an existing category off", () => {
    const state = preferencesReducer(
      DEFAULT_PREFERENCES,
      toggleCategory("technology"),
    );

    expect(state.categories).not.toContain("technology");
  });

  it("toggles a content type", () => {
    const state = preferencesReducer(
      DEFAULT_PREFERENCES,
      toggleContentType("movie"),
    );

    expect(state.contentTypes).not.toContain("movie");
  });

  it("updates dark mode", () => {
    const state = preferencesReducer(
      DEFAULT_PREFERENCES,
      setDarkMode(true),
    );

    expect(state.darkMode).toBe(true);
  });

  it("resets preferences", () => {
    const modifiedState = preferencesReducer(
      {
        categories: ["sports"],
        contentTypes: ["movie"],
        darkMode: true,
      },
      resetPreferences(),
    );

    expect(modifiedState).toEqual(
      DEFAULT_PREFERENCES,
    );
  });
});