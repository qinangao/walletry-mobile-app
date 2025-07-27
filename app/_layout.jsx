import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inRootGroup = segments[0] === "(root)";
    const onLanding = segments[0] === "landing" || segments.length === 0;

    if (isSignedIn && !inRootGroup) {
      // User is signed in but not in root group, redirect to home
      router.replace("/");
    } else if (!isSignedIn && !inAuthGroup && !onLanding) {
      // User is not signed in and not in auth group or landing, redirect to landing
      router.replace("/landing");
    }
  }, [isSignedIn, isLoaded, segments, router]);

  return (
    <SafeScreen>
      <Slot />
    </SafeScreen>
  );
};

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  );
}
