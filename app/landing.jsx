// app/landing.jsx
import { styles } from "@/assets/styles/landing.styles";
import { useRouter } from "expo-router";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

export default function Landing() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/(auth)/sign-in");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/landing.webp")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>Welcome to Walletry</Text>
            <Text style={styles.subtitle}>
              Track your expenses easily and efficiently
            </Text>
          </View>

          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
