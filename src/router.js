import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Holidays from "./components/Holidays";
import App from "./App";
import Countries from "./components/Countries";
export const router = createBrowserRouter([
    {
        path: '/',
        element : <App />,
        children: [
            {
                path: '/',
                element: <Countries />
            },
            {
                path: '/holidays/:countryId',
                element: <Holidays />

            }
        ]
    }
])