import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import { useStories } from "@/services/hooks/useStories";
import StoryCard from "@/components/StoryCard";
import Loader from "@/components/Loader";
import ErrorView from "@/components/ErrorView";
import { router } from "expo-router";
import { colors, spacing } from "@/theme";

export default function ShowScreen() {
  const { stories, loading, error, refetch } = useStories("show");

  if (loading) return <Loader />;
  if (error) return <ErrorView message={error} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={stories}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
        renderItem={({ item }) => (
          <StoryCard
            story={item}
            onPress={() => router.push(`/story/${item.id}`)}
          />
        )}
        ListEmptyComponent={<ErrorView message="No stories available." />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
