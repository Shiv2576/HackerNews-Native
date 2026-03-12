import { FlatList, StyleSheet, RefreshControl } from "react-native";
import { useStories } from "@/services/hooks/useStories";
import StoryCard from "@/components/StoryCard";
import Loader from "@/components/Loader";
import ErrorView from "@/components/ErrorView";
import { colors } from "@/theme";
import { useRef } from "react";

export default function NewsScreen() {
  const {
    data,
    isLoading,
    isError,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useStories("new");

  const stories = data?.pages.flat() ?? [];

  const hasRefetchedAtTop = useRef(false);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorView message="Failed to load stories." />;

  return (
    <FlatList
      data={stories}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
          tintColor={colors.primary}
          progressViewOffset={80}
        />
      }
      onScroll={(event) => {
        const offsetY = event.nativeEvent.contentOffset.y;

        if (offsetY <= 0) {
          if (!hasRefetchedAtTop.current) {
            hasRefetchedAtTop.current = true;
            refetch();
          }
        } else {
          hasRefetchedAtTop.current = false;
        }
      }}
      scrollEventThrottle={16}
      renderItem={({ item }) => <StoryCard story={item} />}
      ListEmptyComponent={<ErrorView message="No stories available." />}
      ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 12,
    backgroundColor: colors.background,
  },
});
