import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Swiper from "react-native-deck-swiper";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import { updateFavoriteTeamData } from "../../../../store/reducers/favoriteTeamDataSlice";

import PlayerCard from "../../../_components/playerCard";

export default function Players() {
	const playersData = useSelector((state) => state.playersData.playersData);
	const isLoading = useSelector((state) => state.isLoading);
	const error = useSelector((state) => state.error);

	const favoriteTeamData = useSelector(
		(state) => state.favoriteTeamData.favoriteTeamData
	);

	const dispatch = useDispatch();

	const [cardIndex, setCardIndex] = useState(0);
	const [isSwipedAll, setIsSwipedAll] = useState(false);
	const [isSwiping, setIsSwiping] = useState(false);

	const swiperRef = useRef(null);

	const { slug, category, position } = useLocalSearchParams();

	if (isLoading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View>
				<Text>
					There was an error fetching the player list. Please try again later.
				</Text>
			</View>
		);
	}

	const favoritePlayer = favoriteTeamData.find((player) => {
		return player.category === category;
	});

	let playerList = playersData.filter((player) => {
		return (
			player.position === position &&
			!favoriteTeamData.some((p) => p.id === player.id)
		);
	});

	const handleUpdateFavoritePlayer = (index) => {
		dispatch(
			updateFavoriteTeamData({
				id: playerList[index].id,
				name: playerList[index].name,
				photo: playerList[index].photo,
				category: category,
			})
		);
		setCardIndex(index + 1);
	};

	const handlePreviousPlayer = () => {
		if (cardIndex === 0) return;

		swiperRef.current.swipeBack();
		setCardIndex(cardIndex - 1);
	};

	const handleNextPlayer = () => {
		swiperRef.current.swipeBottom();
		setCardIndex(cardIndex + 1);
	};

	return (
		<View style={styles.container}>
			{isSwiping && (
				<View style={styles.instructionsContainer}>
					<View style={[styles.instructions, { top: "2.5%" }]}>
						<MaterialIcons
							name="arrow-forward-ios"
							size={24}
							color="#F5E9CF"
							style={{ transform: [{ rotate: "-90deg" }] }}
						/>
						<Text style={styles.instructionsText}>
							Make {playerList[cardIndex].name.split(" ")[1]} your favorite
						</Text>
					</View>

					<View style={[styles.instructions, { bottom: "2.5%" }]}>
						<Text style={styles.instructionsText}>Go to the next player</Text>

						<MaterialIcons
							name="arrow-back-ios"
							size={24}
							color="#F5E9CF"
							style={{ transform: [{ rotate: "-90deg" }] }}
						/>
					</View>
				</View>
			)}

			<View style={isSwiping ? { opacity: 0 } : { opacity: 1 }}>
				<Text style={styles.title}>
					Your current {category.toLocaleLowerCase()} is:{" "}
				</Text>
				<Text style={styles.favoritePlayerName}>
					{favoritePlayer.name ? favoritePlayer.name : "None"}
				</Text>
			</View>

			<View style={{ position: "relative", flex: 1, justifyContent: "center" }}>
				{!isSwipedAll ? (
					<>
						<Swiper
							ref={swiperRef}
							cards={playerList}
							renderCard={(card) => {
								return <PlayerCard name={card.name} slug={slug} />;
							}}
							horizontalSwipe={false}
							backgroundColor="transparent"
							swipeBackCard={true}
							onSwipedTop={(index) => handleUpdateFavoritePlayer(index)}
							onSwipedAll={() => setIsSwipedAll(true)}
							dragStart={() => setIsSwiping(true)}
							dragEnd={() => setIsSwiping(false)}
						/>
						{!isSwiping && (
							<View style={styles.buttonsContainer}>
								<Pressable
									disabled={cardIndex === 0}
									onPress={() => handlePreviousPlayer()}
									style={{ transform: [{ scaleX: -1 }] }}
								>
									<MaterialIcons
										name="next-plan"
										size={36}
										color="#4D455D"
										style={cardIndex === 0 && { opacity: 0.2 }}
									/>
								</Pressable>
								<Pressable onPress={() => swiperRef.current.swipeTop()}>
									<MaterialIcons name="stars" size={36} color="#7DB9B6" />
								</Pressable>
								<Pressable>
									<MaterialIcons
										name="cancel"
										size={36}
										color="#E96479"
										onPress={() => handleNextPlayer()}
									/>
								</Pressable>
							</View>
						)}
					</>
				) : (
					<Pressable
						style={styles.returnButton}
						onPress={() => router.push("/selection")}
					>
						<Text style={styles.returnButtonText}>
							Go back to the selection
						</Text>
					</Pressable>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		marginVertical: 16,
	},
	title: {
		textAlign: "center",
		fontSize: 20,
		fontFamily: "Changa_400Regular",
		color: "#1D1A22",
	},
	favoritePlayerName: {
		textAlign: "center",
		fontSize: 24,
		fontFamily: "Dhurjati_400Regular",
		color: "#1D1A22",
	},
	buttonsContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 60,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	returnButton: {
		width: "fit-content",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 4,
		marginVertical: 24,
		marginHorizontal: 32,
		borderRadius: 4,
		backgroundColor: "#4D455D",
	},
	returnButtonText: {
		textAlign: "center",
		fontSize: 20,
		fontFamily: "Changa_400Regular",
		color: "#ECD6A5",
	},
	instructionsContainer: {
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: "#1D1A22",
		opacity: 0.8,
	},
	instructions: {
		position: "absolute",
		width: "100%",
		alignItems: "center",
	},
	instructionsText: {
		textAlign: "center",
		fontSize: 24,
		fontFamily: "Dhurjati_400Regular",
		color: "#F5E9CF",
	},
});
