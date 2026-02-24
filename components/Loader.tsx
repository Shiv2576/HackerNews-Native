import { View, ActivityIndicator } from "react-native";

export default function Loader() {
  return (
    <View style={{ marginTop: 40 }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
