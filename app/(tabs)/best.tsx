import { View, Text, StyleSheet } from "react-native";
import { colors, spacing } from "@/theme";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>

      <View style={styles.separator} />

      <Text style={styles.description}>This is the second tab screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: spacing.md,
  },
  separator: {
    height: 1,
    width: "80%",
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
