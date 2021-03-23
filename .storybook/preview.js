
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
import "../src/Styling/index.css"

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppContext, } from '../src/AppContext';

export const decorators = [
  (Story, args) => (console.log(args) ||
    <AppContext.Provider value={{ state: args.state, dispatch: () => { } }}>
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    </AppContext.Provider >
  ),
];