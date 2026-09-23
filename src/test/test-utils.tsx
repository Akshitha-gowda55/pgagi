import type { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import { store } from "@/store/store";

export function renderWithRedux(
  ui: ReactElement,
) {
  return render(
    <Provider store={store}>
      {ui}
    </Provider>,
  );
}

export function ReduxTestProvider({
  children,
}: PropsWithChildren) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}