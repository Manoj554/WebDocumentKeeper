import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import contactReducer from "./contactus.reducer";
import dashboardReducer from "./dashboard.reducer";

const rootReducer = combineReducers({
    auth:authReducer,
    documents:dashboardReducer,
    contactus:contactReducer
});

export default rootReducer;