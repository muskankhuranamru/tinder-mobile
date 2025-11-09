import { Colors } from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    // Start the animation
    animation.current?.play();

    const timer = setTimeout(() => {
      router.replace("/(tabs)");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={Colors.gradients.splash}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <LottieView
          ref={animation}
          source={require("../assets/lottie/splash-screen-lottie.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={styles.logo}>Tinder</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.white,
    letterSpacing: 2,
  },
});
