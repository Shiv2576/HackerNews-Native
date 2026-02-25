import { View, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "@/theme";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            navigation.navigate(route.name);
          };

          let iconName = "ellipse-outline";

          if (route.name === "index") iconName = "flame-outline";
          if (route.name === "best") iconName = "star-outline";
          if (route.name === "ask") iconName = "chatbubble-outline";
          if (route.name === "show") iconName = "eye-outline";

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <Ionicons
                name={iconName}
                size={25}
                color={isFocused ? colors.primary : colors.textMuted}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 40, // 🔥 move higher on Y-axis (increase value)
    left: spacing.xl,
    right: spacing.xl,
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    backgroundColor: colors.background,

    paddingVertical: spacing.sm, // 🔥 thinner height
    paddingHorizontal: spacing.md,

    borderRadius: 40, // keep cylindrical look

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },

  tab: {
    paddingVertical: spacing.sm, // reduce vertical padding
    paddingHorizontal: spacing.md,
  },
});
