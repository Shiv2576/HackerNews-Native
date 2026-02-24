import { useEffect, useState } from "react";
import { getItemDetails } from "../api/endpoints";
import type { Item } from "@/shared/types";

export function useStory(id: number | string) {
  const [story, setStory] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getItemDetails(id);
        setStory(data);
      } catch (err: any) {
        setError(err.message ?? "Failed to fetch story");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return { story, loading, error };
}
