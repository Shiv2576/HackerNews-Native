import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getItemDetails } from "../api/endpoints";
import type { Item } from "@/shared/types";

const COMMENTS_PAGE_SIZE = 20;

export function useStory(id: number | string) {
  // 1️⃣ Fetch Story
  const storyQuery = useQuery({
    queryKey: ["story", id],
    queryFn: () => getItemDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  // 2️⃣ Fetch Comments (Paginated)
  const commentsQuery = useInfiniteQuery({
    queryKey: ["storyComments", id],
    initialPageParam: 0,
    enabled: !!storyQuery.data?.kids?.length,

    queryFn: async ({ pageParam }) => {
      const kids = storyQuery.data?.kids ?? [];

      const start = pageParam * COMMENTS_PAGE_SIZE;
      const end = start + COMMENTS_PAGE_SIZE;
      const slice = kids.slice(start, end);

      const comments = await Promise.all(
        slice.map((commentId: number) => getItemDetails(commentId)),
      );

      return comments;
    },

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === COMMENTS_PAGE_SIZE
        ? allPages.length
        : undefined;
    },
  });

  return {
    story: storyQuery.data,
    comments: commentsQuery.data?.pages.flat() ?? [],

    isLoading: storyQuery.isLoading,
    isError: storyQuery.isError,

    fetchMoreComments: commentsQuery.fetchNextPage,
    hasMoreComments: commentsQuery.hasNextPage,
    isFetchingMoreComments: commentsQuery.isFetchingNextPage,

    refetch: storyQuery.refetch,
  };
}
