import { View, StyleSheet, Text, Platform } from "react-native";
import { Image } from "expo-image";

export default function SelectionCard({ description, favoritePlayer }) {
	return (
		<View
			style={[
				styles.card,
				favoritePlayer.id
					? { flexDirection: "row", alignItems: "center" }
					: null,
			]}
		>
			{favoritePlayer.id ? (
				<Image source={favoritePlayer.photo} style={styles.photo} />
			) : null}
			<View
				style={favoritePlayer.id ? { flex: 1, alignItems: "center" } : null}
			>
				<View>
					<Text style={styles.cardTitle}>
						{favoritePlayer.id ? favoritePlayer.name : favoritePlayer.category}
					</Text>
				</View>
				<View>
					<Text style={styles.cardText}>
						{favoritePlayer.id ? favoritePlayer.category : description}
					</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: 240,
		marginLeft: 48,
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: "#F2F2F2",
		borderRadius: 16,
		borderWidth: 1,
		...Platform.select({
			ios: {
				shadowColor: "#1D1A22",
				shadowOffset: {
					width: 1,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 6,
			},
			android: {
				elevation: 6,
			},
		}),
	},
	photo: {
		width: 48,
		height: 48,
		borderRadius: 8,
	},
	cardTitle: {
		fontSize: 20,
		fontFamily: "Changa_400Regular",
		color: "#1D1A22",
	},
	cardText: {
		fontSize: 16,
		fontFamily: "Arsenal_400Regular",
		color: "#1D1A22",
	},
});
