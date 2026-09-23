import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, beforeEach } from "vitest";

import { renderWithRedux } from "@/test/test-utils";
import { store } from "@/store/store";
import {
  resetPreferences,
} from "@/features/preferences/preferencesSlice";

import SettingsPage from "./page";

describe("SettingsPage", () => {
  beforeEach(() => {
    store.dispatch(resetPreferences());
  });

  it("renders the settings page", () => {
    renderWithRedux(<SettingsPage />);

    expect(
      screen.getByRole("heading", {
        name: "Customize your feed",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Personalization"),
    ).toBeInTheDocument();
  });

  it("renders the interests section", () => {
    renderWithRedux(<SettingsPage />);

    expect(
      screen.getByRole("heading", {
        name: "Your interests",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Technology"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Business"),
    ).toBeInTheDocument();
  });

  it("renders the content source section", () => {
    renderWithRedux(<SettingsPage />);

    expect(
      screen.getByRole("heading", {
        name: "Content sources",
      }),
    ).toBeInTheDocument();
  });

  it("renders the reset preferences button", () => {
    renderWithRedux(<SettingsPage />);

    expect(
      screen.getByRole("button", {
        name: /reset preferences/i,
      }),
    ).toBeInTheDocument();
  });

  it("allows the user to toggle an interest", async () => {
    const user = userEvent.setup();

    renderWithRedux(<SettingsPage />);

    const technologyButton =
      screen.getByRole("button", {
        name: /technology/i,
      });

    expect(
      store.getState().preferences.categories,
    ).toContain("technology");

    await user.click(technologyButton);

    expect(
      store.getState().preferences.categories,
    ).not.toContain("technology");

    await user.click(technologyButton);

    expect(
      store.getState().preferences.categories,
    ).toContain("technology");
  });

  it("resets preferences", async () => {
    const user = userEvent.setup();

    renderWithRedux(<SettingsPage />);

    const technologyButton =
      screen.getByRole("button", {
        name: /technology/i,
      });

    await user.click(technologyButton);

    expect(
      store.getState().preferences.categories,
    ).not.toContain("technology");

    await user.click(
      screen.getByRole("button", {
        name: /reset preferences/i,
      }),
    );

    expect(
      store.getState().preferences.categories,
    ).toContain("technology");

    expect(
      store.getState().preferences.contentTypes,
    ).toEqual([
      "news",
      "movie",
      "social",
    ]);
  });
});
