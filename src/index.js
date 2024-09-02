

import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./app";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

let root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
        <Provider store={appStore}>
                <AppLayout />
        </Provider>
);






// root.render(<RouterProvider router={appRoutes} />)