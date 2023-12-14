import { useRef } from "react";
import { useSelector } from "react-redux";
import {
	View,
	StyleSheet,
	Text,
	Pressable,
	ImageBackground,
} from "react-native";
import ViewShot from "react-native-view-shot";
import { Image } from "expo-image";
import * as Sharing from "expo-sharing";

import FieldBackground from "../../../../assets/background/field.png";
import Credit from "../../../../assets/images/credit.png";

export default function FavoriteTeam() {
	const favoriteTeamData = useSelector(
		(state) => state.favoriteTeamData.favoriteTeamData
	);

	const viewShot = useRef();

	const handleShareTeam = async () => {
		try {
			const uri = await viewShot.current.capture();

			await Sharing.shareAsync("file://" + uri);
		} catch (err) {
			console.error(err);
		}
	};

	const compostion = favoriteTeamData.map((player) => {
		return {
			name: player.name,
			photo: player.photo,
			styles: player.category.replace(/\s+/g, "_").toLowerCase(),
		};
	});

	return (
		<View style={styles.container}>
			<Text style={styles.title}>My five-a-side team</Text>
			<ViewShot
				style={{ flex: 1 }}
				options={{ format: "jpg", quality: 1 }}
				ref={viewShot}
			>
				<View style={styles.field}>
					<ImageBackground
						source={FieldBackground}
						style={{ position: "absolute", width: "100%", height: "100%" }}
					>
						<View style={styles.lines}>
							<View style={styles.goalLine} />
							<View style={styles.goalCircle} />
							<View style={styles.fieldCircle} />
						</View>
						{compostion.map((player) => {
							return (
								<View
									key={player.name}
									style={[styles.player, styles[player.styles]]}
								>
									<Image
										source={player.photo}
										contentFit="cover"
										style={styles.photo}
									/>
									<View style={[styles.player, styles.photo, styles.frame]} />
									<Text style={styles.playerName}>{player.name}</Text>
								</View>
							);
						})}
						<Image source={Credit} style={styles.credit} />
					</ImageBackground>
				</View>
			</ViewShot>
			<Pressable style={styles.button} onPress={handleShareTeam}>
				<Text style={styles.buttonText}>Share</Text>
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
		marginBottom: 16,
		textAlign: "center",
		fontSize: 24,
		fontFamily: "Changa_400Regular",
	},
	field: {
		position: "relative",
		width: 280,
		flex: 1,
		marginBottom: 16,
		backgroundColor: "#25a519",
	},
	credit: {
		position: "absolute",
		height: "10%",
		width: "20%",
		bottom: "5%",
		right: "4%",
	},
	lines: {
		position: "absolute",
		height: "99%",
		width: "98%",
		top: "0.5%",
		left: "1%",
		borderWidth: 4,
		borderColor: "#ffffff",
	},
	goalLine: {
		position: "absolute",
		height: "10%",
		width: "50%",
		bottom: "0%",
		left: "25%",
		borderBottomWidth: 0,
		borderWidth: 4,
		borderColor: "#ffffff",
	},
	goalCircle: {
		position: "absolute",
		height: "5%",
		width: "20%",
		bottom: "10%",
		left: "40%",
		borderTopEndRadius: 50,
		borderTopStartRadius: 50,
		borderBottomWidth: 0,
		borderWidth: 4,
		borderColor: "#ffffff",
	},
	fieldCircle: {
		position: "absolute",
		height: "12%",
		width: "40%",
		top: "0%",
		left: "30%",
		borderBottomEndRadius: 200,
		borderBottomStartRadius: 200,
		borderTopWidth: 0,
		borderWidth: 4,
		borderColor: "#ffffff",
	},
	player: {
		position: "absolute",
		height: 50,
		width: 75,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#ffffff",
	},
	photo: {
		width: "100%",
		height: "100%",
		borderRadius: 8,
		backgroundColor: "#ffffff",
	},
	frame: {
		height: "110%",
		width: "110%",
		left: "-5%",
		top: "-5%",
		borderWidth: 3.5,
		borderColor: "#F5E9CF",
		backgroundColor: "transparent",
	},
	playerName: {
		textAlign: "center",
		fontSize: 12,
		fontFamily: "Changa_400Regular",
		color: "#ECD6A5",
		textShadowColor: "#1D1A22",
		textShadowOffset: { width: -2, height: 2 },
		textShadowRadius: 10,
	},
	goalkeeper: {
		bottom: "20%",
		left: "37%",
	},
	defender: {
		bottom: "40%",
		left: "37%",
	},
	midfielder_versatile: {
		top: "32%",
		left: "10%",
	},
	midfielder_playmaker: {
		top: "26%",
		right: "10%",
	},
	attacker: {
		top: "8%",
		left: "37%",
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
	buttonText: {
		textAlign: "center",
		fontSize: 24,
		fontFamily: "Dhurjati_400Regular",
		color: "#F2F2F2",
	},
});
