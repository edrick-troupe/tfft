import { View, StyleSheet, Text, Platform } from "react-native";
import { Image } from "expo-image";

export default function PlayerCard({ name, slug }) {
	const avatar = {
		goalkeeper: require("../../assets/avatar/goalkeeper.jpg"),
		defender: require("../../assets/avatar/defender.jpg"),
		midfielder_playmaker: require("../../assets/avatar/midfielder-playmaker.jpg"),
		midfielder_versatile: require("../../assets/avatar/midfielder-versatile.jpg"),
		attacker: require("../../assets/avatar/attacker.jpg"),
	};

	const newSlug = slug.replace(/-/g, "_");

	return (
		<View style={styles.card}>
			<View style={styles.cardImage}>
				<Image
					source={avatar[newSlug]}
					contentFit="cover"
					style={styles.photo}
				/>
			</View>
			<View style={styles.cardName}>
				<Text style={styles.playerName}>{name}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: 260,
		height: 400,
		marginLeft: 16,
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
	cardImage: {
		flex: 1,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},
	photo: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		zIndex: 2,
	},
	cardName: {
		width: "100%",
		height: "20%",
		padding: 16,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	playerName: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
		color: "#1D1A22",
	},
});
