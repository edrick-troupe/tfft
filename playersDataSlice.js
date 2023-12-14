import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	playersData: [],
	isLoading: false,
	error: null,
};

const teamsId = [50, 85, 157, 505, 541];

export const fetchPlayersData = createAsyncThunk(
	"playersData/fetchPlayersData",
	async () => {
		try {
			const allTeamsData = await Promise.all(
				teamsId.map(async (id) => {
					const response = await fetch(
						`https://v3.football.api-sports.io/players/squads?team=${id}`,
						{
							method: "GET",
							headers: {
								"x-rapidapi-host": "v3.football.api-sports.io",
								"x-rapidapi-key": process.env.EXPO_PUBLIC_API_KEY,
							},
						}
					);
					const data = await response.json();

					const selectedData = data.response[0].players.map((player) => {
						return {
							id: player.id,
							name: player.name,
							photo: player.photo,
							position: player.position,
						};
					});
					return selectedData;
				})
			);

			let allTeamDataList = allTeamsData.flat();
			allTeamDataList = allTeamDataList.sort(() => Math.random() - 0.5);

			return allTeamDataList;
		} catch (error) {
			throw new Error(error.message);
		}
	}
);

const playersDataSlice = createSlice({
	name: "playersData",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPlayersData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchPlayersData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.playersData = action.payload;
			})
			.addCase(fetchPlayersData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});
	},
});

export const playersDataReducer = playersDataSlice.reducer;
