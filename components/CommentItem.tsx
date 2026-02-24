import { View, Text, StyleSheet } from "react-native";
import type { Item } from "@/shared/types";
import { formatTime } from "@/utils/formatTime";
import { stripHtml } from "@/utils/helpers";
import { colors, spacing } from "@/theme";

type Props = {
  comment: Item;
};

export default function CommentItem({ comment }: Props) {
  if (comment.deleted || comment.dead) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.author}>{comment.by}</Text>

      {comment.text ? (
        <Text style={styles.content}>{stripHtml(comment.text)}</Text>
      ) : null}

      <Text style={styles.meta}>
        {comment.by} • {formatTime(comment.time)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginLeft: spacing.sm,
    backgroundColor: colors.card,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  author: {
    fontWeight: "600",
    fontSize: 14,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  content: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  meta: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
