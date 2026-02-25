import { StyleSheet, FlatList, RefreshControl } from "react-native";
import { colors } from "@/theme";
import { useStories } from "@/services/hooks/useStories";
import StoryCard from "@/components/StoryCard";
import Loader from "@/components/Loader";
import ErrorView from "@/components/ErrorView";
import { useState } from "react";

export default function BestScreen() {
  const {
    data,
    isLoading,
    isError,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useStories("best");

  const [refreshing, setRefreshing] = useState(false);

  // 🔥 Flatten paginated data
  const stories = data?.pages?.flat() ?? [];

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) return <Loader />;
  if (isError) return <ErrorView message="Failed to load stories." />;

  return (
    <FlatList
      data={stories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <StoryCard story={item} />}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing || isRefetching}
          onRefresh={onRefresh}
          tintColor={colors.primary}
        />
      }
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 12,
    backgroundColor: colors.background,
  },
});
