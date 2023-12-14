import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

import { fetchPlayersData } from "../../store/reducers/playersDataSlice";

import HeadlineLogo from "../../assets/logo/headline_logo.png";

export default function Home() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPlayersData());
	}, []);

	return (
		<>
			<View style={styles.header}>
				<Image source={HeadlineLogo} style={styles.headlineLogo} />
			</View>
			<View style={styles.home}>
				<Text style={styles.presentationText}>
					Build your five-a-side football team
				</Text>
				<Pressable
					style={styles.button}
					onPress={() => router.push("/selection")}
				>
					<Text style={styles.buttonText}>Start</Text>
				</Pressable>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	header: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 16,
	},
	headlineLogo: {
		width: "100%",
		height: 120,
	},
	home: {
		flex: 1,
		justifyContent: "space-evenly",
		alignItems: "center",
		paddingHorizontal: 24,
	},
	presentationText: {
		fontSize: 28,
		textAlign: "center",
		fontFamily: "Changa_400Regular",
		color: "#1D1A22",
	},
	button: {
		paddingHorizontal: 24,
		backgroundColor: "#FEFCF9",
		borderRadius: 8,
		borderWidth: 2,
		borderColor: "#1D1A22",
	},
	buttonText: {
		fontSize: 28,
		fontFamily: "Dhurjati_400Regular",
		textTransform: "uppercase",
		color: "#352F40",
	},
});
