import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { colors } from "@/theme";
import HeaderTitle from "@/components/HeaderTitle";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.primary,
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            headerTitle: () => <HeaderTitle />,
          }}
        />

        <Stack.Screen name="story/[id]" options={{ title: "Story" }} />
        <Stack.Screen name="user/[id]" options={{ title: "User" }} />
      </Stack>
    </QueryClientProvider>
  );
}
