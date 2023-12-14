import { createSlice } from "@reduxjs/toolkit";

const favoriteTeam = [
	{
		id: null,
		name: "",
		photo: "",
		position: "Goalkeeper",
		category: "Goalkeeper",
	},
	{
		id: null,
		name: "",
		photo: "",
		position: "Defender",
		category: "Defender",
	},
	{
		id: null,
		name: "",
		photo: "",
		position: "Midfielder",
		category: "Midfielder Versatile",
	},
	{
		id: null,
		name: "",
		photo: "",
		position: "Midfielder",
		category: "Midfielder Playmaker",
	},
	{
		id: null,
		name: "",
		photo: "",
		position: "Attacker",
		category: "Attacker",
	},
];

const initialState = {
	favoriteTeamData: favoriteTeam,
	isLoading: false,
	error: null,
};

const favoriteTeamDataSlice = createSlice({
	name: "favoriteTeamData",
	initialState,
	reducers: {
		updateFavoriteTeamData: (state, action) => {
			const newFavoriteTeam = state.favoriteTeamData.filter((player) => {
				return player.category !== action.payload.category;
			});
			newFavoriteTeam.push(action.payload);

			state.favoriteTeamData = newFavoriteTeam;
		},
	},
});

export const { updateFavoriteTeamData } = favoriteTeamDataSlice.actions;

export const favoriteTeamDataReducer = favoriteTeamDataSlice.reducer;
