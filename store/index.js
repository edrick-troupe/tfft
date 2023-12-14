import { configureStore } from "@reduxjs/toolkit";

import { playersDataReducer } from "./reducers/playersDataSlice";
import { favoriteTeamDataReducer } from "./reducers/favoriteTeamDataSlice";

export const store = configureStore({
	reducer: {
		playersData: playersDataReducer,
		favoriteTeamData: favoriteTeamDataReducer,
	},
});
