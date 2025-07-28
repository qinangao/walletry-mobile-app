import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Stack } from "expo-router/stack";

function Layout() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; // for better UX
  if (!isSignedIn) return <Redirect href={"/landing"} />;
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default Layout;
