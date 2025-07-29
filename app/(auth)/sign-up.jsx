import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../../assets/styles/auth.styles";
import { COLORS } from "../../constants/colors";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      if (err.errors?.[0]?.message) {
        setError(err.errors[0].message);
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      if (err.errors?.[0].code === "form_identifier_exists") {
        setError("This email already exists. Please try a different email.");
      } else {
        setError("An error occurred.Please try again.");
      }
    }
  };
  return (
    <ImageBackground
      source={require("../../assets/images/sign-up.webp")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraHeight={150}
      >
        <View style={styles.container}>
          {pendingVerification ? (
            <>
              <Text style={styles.verificationTitle}>Verify your email</Text>
              {error ? (
                <View style={styles.errorBox}>
                  <Ionicons
                    name="alert-circle"
                    size={20}
                    color={COLORS.expense}
                  />
                  <Text style={styles.errorText}>{error}</Text>
                  <TouchableOpacity onPress={() => setError("")}>
                    <Ionicons name="close" size={20} color={COLORS.textLight} />
                  </TouchableOpacity>
                </View>
              ) : null}

              <TextInput
                style={[styles.verificationInput, error && styles.errorInput]}
                value={code}
                placeholder="Enter your verification code"
                onChangeText={(code) => setCode(code)}
                placeholderTextColor="#9A8478"
              />
              <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
                <Text style={styles.buttonText}>Verify</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>Create an account</Text>
              <View style={styles.card}>
                {error ? (
                  <View style={styles.errorBox}>
                    <Ionicons
                      name="alert-circle"
                      size={20}
                      color={COLORS.expense}
                    />
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity onPress={() => setError("")}>
                      <Ionicons
                        name="close"
                        size={20}
                        color={COLORS.textLight}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}

                <TextInput
                  style={[styles.input, error && styles.errorInput]}
                  autoCapitalize="none"
                  value={emailAddress}
                  placeholder="Enter email"
                  placeholderTextColor="#666666"
                  onChangeText={(email) => setEmailAddress(email)}
                />
                <TextInput
                  style={[styles.input, error && styles.errorInput]}
                  value={password}
                  placeholder="Enter password"
                  placeholderTextColor="#666666"
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                />
                <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.footerContainer}>
                  <Text style={styles.footerText}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity onPress={() => router.push("/sign-in")}>
                    <Text style={styles.linkText}>Sign in</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}
