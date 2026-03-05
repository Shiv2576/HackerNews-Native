import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { colors } from "@/theme";

export default function HeaderTitle() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/HackerNews.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>HackerNews</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    width: "120%",
    paddingBottom: 14,
    marginBottom: -10,

    borderBottomWidth: 4,
    borderBottomColor: colors.primary,
  },

  logo: {
    width: 35,
    height: 35,
    marginLeft: 35,
  },

  text: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
});
