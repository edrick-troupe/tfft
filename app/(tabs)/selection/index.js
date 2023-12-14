import { useSelector } from "react-redux";
import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import { Link, router } from "expo-router";

import SelectionCard from "../../_components/selectionCard";

const selectionCategories = [
	{
		id: 1,
		category: "Goalkeeper",
		slug: "goalkeeper",
		position: "Goalkeeper",
		description: "This category contains goalkeepers",
	},
	{
		id: 2,
		category: "Defender",
		slug: "defender",
		position: "Defender",
		description: "This category contains lateral and central defenders",
	},
	{
		id: 3,
		category: "Midfielder Versatile",
		slug: "midfielder-versatile",
		position: "Midfielder",
		description: "This category contains all kinds of midfielders",
	},
	{
		id: 4,
		category: "Midfielder Playmaker",
		slug: "midfielder-playmaker",
		position: "Midfielder",
		description: "This category contains all kinds of midfielders",
	},
	{
		id: 5,
		category: "Attacker",
		slug: "attacker",
		position: "Attacker",
		description: "This category contains wingers and strikers",
	},
];

export default function Selection() {
	const favoriteTeamData = useSelector(
		(state) => state.favoriteTeamData.favoriteTeamData
	);

	const favoriteTeamFulfilledSpots = favoriteTeamData.filter((player) => {
		return player.id !== null;
	});

	const favoriteTeamIsCompleted =
		favoriteTeamFulfilledSpots.length === favoriteTeamData.length;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Choose your favorite player for each position
			</Text>
			<FlatList
				data={selectionCategories}
				renderItem={({ item }) => {
					const favoritePlayer = favoriteTeamData.find((player) => {
						return player.category === item.category;
					});
					return (
						<Link
							href={{
								pathname: "/selection/players/[slug]",
								params: {
									slug: item.slug,
									category: item.category,
									position: item.position,
								},
							}}
						>
							<SelectionCard
								description={item.description}
								favoritePlayer={favoritePlayer}
							/>
						</Link>
					);
				}}
				contentContainerStyle={{
					alignItems: "center",
				}}
				ItemSeparatorComponent={<View style={{ height: 24 }} />}
				nestedScrollEnabled
				ListHeaderComponent={<View style={{ height: 24 }} />}
				ListFooterComponent={<View style={{ height: 18 }} />}
			/>

			<Pressable
				style={[
					styles.button,
					!favoriteTeamIsCompleted && styles.disabledButton,
				]}
				disabled={!favoriteTeamIsCompleted}
				onPress={() => {
					router.push("/selection/favorite-team");
				}}
			>
				<Text
					style={[
						styles.buttonText,
						!favoriteTeamIsCompleted && styles.disabledButtonText,
					]}
				>
					{favoriteTeamIsCompleted
						? "Finish"
						: favoriteTeamFulfilledSpots.length + "/" + favoriteTeamData.length}
				</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 16,
	},
	title: {
		marginHorizontal: 16,
		marginBottom: 16,
		fontSize: 24,
		fontFamily: "Changa_400Regular",
		textAlign: "center",
	},
	button: {
		width: "fit-content",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 4,
		marginVertical: 24,
		marginHorizontal: 80,
		borderRadius: 16,
		backgroundColor: "#352F40",
	},
	disabledButton: {
		borderWidth: 1,
		borderColor: "#352F40",
		backgroundColor: "#ECD6A5",
	},
	buttonText: {
		fontSize: 24,
		fontFamily: "Dhurjati_400Regular",
		color: "#F2F2F2",
	},
	disabledButtonText: {
		color: "#4D455D",
	},
});
