import { useCallback } from "react";
import { Provider } from "react-redux";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Changa_400Regular } from "@expo-google-fonts/changa";
import { Arsenal_400Regular } from "@expo-google-fonts/arsenal";
import { Dhurjati_400Regular } from "@expo-google-fonts/dhurjati";

import { store } from "../store";

export default function RootLayout() {
	let [fontsLoaded, fontError] = useFonts({
		Changa_400Regular,
		Arsenal_400Regular,
		Dhurjati_400Regular,
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<Provider store={store}>
			<SafeAreaView style={styles.body} onLayout={onLayoutRootView}>
				<Slot />
			</SafeAreaView>
		</Provider>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		paddingTop: Platform.OS === "android" ? 24 : 12,
		paddingHorizontal: 16,
		backgroundColor: "#FAF4E7",
		alignItems: "center",
	},
});
