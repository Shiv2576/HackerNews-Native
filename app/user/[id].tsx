import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useUser } from "@/services/hooks/useUser";
import Loader from "@/components/Loader";

export default function UserScreen() {
  const { id } = useLocalSearchParams();
  const { user, loading } = useUser(id as string);

  if (loading || !user) return <Loader />;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{user.id}</Text>
      <Text>Karma: {user.karma}</Text>
    </View>
  );
}
