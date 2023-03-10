import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { RoomProvider } from "./context/room/RoomProvider";

const { library } = require("@fortawesome/fontawesome-svg-core");
const { fab } = require("@fortawesome/free-brands-svg-icons");
const { fas } = require("@fortawesome/free-solid-svg-icons");
const { far } = require("@fortawesome/free-regular-svg-icons");

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <RoomProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </RoomProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

library.add(fab, fas, far);
