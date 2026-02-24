import { View, Text } from "react-native";

type Props = {
  message: string;
};

export default function ErrorView({ message }: Props) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ color: "red", fontWeight: "600" }}>
        Something went wrong
      </Text>

      <Text style={{ marginTop: 6 }}>{message}</Text>
    </View>
  );
}
