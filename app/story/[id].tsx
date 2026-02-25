import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useStory } from "@/services/hooks/useStory";
import Loader from "@/components/Loader";
import ErrorView from "@/components/ErrorView";
import CommentItem from "@/components/CommentItem";
import { formatTime } from "@/utils/formatTime";
import { colors, spacing } from "@/theme";

export default function StoryDetails() {
  const { id } = useLocalSearchParams();

  const {
    story,
    comments,
    isLoading,
    isError,
    fetchMoreComments,
    hasMoreComments,
    isFetchingMoreComments,
  } = useStory(Number(id));

  if (isLoading) return <Loader />;

  if (isError || !story) return <ErrorView message="Failed to load story." />;

  return (
    <FlatList
      data={comments}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>{story.title}</Text>

          <Text style={styles.meta}>
            {story.score} points • {story.by} • {formatTime(story.time)}
          </Text>
        </View>
      }
      renderItem={({ item }) => <CommentItem comment={item} />}
      onEndReached={() => {
        if (hasMoreComments) {
          fetchMoreComments();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingMoreComments ? <Loader /> : null}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.background,
    paddingBottom: spacing.xl,
  },
  header: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  meta: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
