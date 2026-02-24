import { useEffect, useState, useCallback } from "react";
import {
  getTopStories,
  getBestStories,
  getAskStories,
  getShowStories,
  getItemDetails,
} from "../api/endpoints";
import type { Item } from "@/shared/types";

type StoryType = "top" | "best" | "ask" | "show";

export function useStories(type: StoryType) {
  const [stories, setStories] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let ids: number[] = [];

      switch (type) {
        case "top":
          ids = await getTopStories();
          break;
        case "best":
          ids = await getBestStories();
          break;
        case "ask":
          ids = await getAskStories();
          break;
        case "show":
          ids = await getShowStories();
          break;
      }

      const firstTen = ids.slice(0, 10);

      const items = await Promise.all(firstTen.map((id) => getItemDetails(id)));

      setStories(items);
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  return {
    stories,
    loading,
    error,
    refetch: fetchStories,
  };
}
