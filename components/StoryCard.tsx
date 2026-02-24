import { View, Text, Pressable } from "react-native";
import type { Item } from "@/shared/types";
import { formatTime } from "@/utils/formatTime";
import { truncateText, safeNumber } from "@/utils/helpers";
import { colors, spacing } from "@/theme";

type Props = {
  story: Item;
  onPress?: () => void;
};

export default function StoryCard({ story, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          padding: spacing.lg,
          backgroundColor: colors.card,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        {/* Title */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: colors.textPrimary,
          }}
        >
          {truncateText(story.title, 90)}
        </Text>

        {/* Meta Info */}
        <Text
          style={{
            marginTop: spacing.sm,
            color: colors.textSecondary,
          }}
        >
          {story.score} points • {story.by} • {formatTime(story.time)}
        </Text>

        {/* Comments */}
        <Text
          style={{
            marginTop: spacing.xs,
            color: colors.primary,
          }}
        >
          {safeNumber(story.descendants)} comments
        </Text>
      </View>
    </Pressable>
  );
}
