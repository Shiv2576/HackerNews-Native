import { View, Text, Pressable, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";
import type { Item } from "@/shared/types";
import { formatTime } from "@/utils/formatTime";
import { truncateText, safeNumber } from "@/utils/helpers";
import { colors, spacing } from "@/theme";

type Props = {
  story: Item;
};

export default function StoryCard({ story }: Props) {
  const openStoryUrl = async () => {
    if (!story.url) return;

    await WebBrowser.openBrowserAsync(story.url);
  };

  const openComments = () => {
    router.push(`/story/${story.id}`);
  };

  return (
    <View style={styles.container}>
      {/* TITLE → Opens URL */}
      <Pressable onPress={openStoryUrl}>
        <Text style={styles.title}>{truncateText(story.title, 90)}</Text>
      </Pressable>

      {/* META */}
      <Text style={styles.meta}>
        {story.score} points • {story.by} • {formatTime(story.time)}
      </Text>

      {/* COMMENTS → Opens Comment Screen */}
      <Pressable onPress={openComments}>
        <Text style={styles.comments}>
          {safeNumber(story.descendants)} comments
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  meta: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
  },
  comments: {
    marginTop: spacing.xs,
    color: colors.primary,
    fontWeight: "600",
  },
});
