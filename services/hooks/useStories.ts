import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getTopStories,
  getBestStories,
  getAskStories,
  getShowStories,
  getItemDetails,
} from "../api/endpoints";
import type { Item } from "@/shared/types";

type StoryType = "top" | "best" | "ask" | "show";

const PAGE_SIZE = 30;

async function getStoryIds(type: StoryType): Promise<number[]> {
  switch (type) {
    case "top":
      return getTopStories();
    case "best":
      return getBestStories();
    case "ask":
      return getAskStories();
    case "show":
      return getShowStories();
  }
}

export function useStories(type: StoryType) {
  return useInfiniteQuery({
    queryKey: ["stories", type],

    initialPageParam: 0,

    queryFn: async ({ pageParam }) => {
      const ids = await getStoryIds(type);

      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const slice = ids.slice(start, end);

      const items = await Promise.all(slice.map((id) => getItemDetails(id)));

      return items;
    },

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === PAGE_SIZE ? allPages.length : undefined;
    },

    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
