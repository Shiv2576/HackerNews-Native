import { useEffect, useState } from "react";
import { getUserDetails } from "../api/endpoints";
import type { User } from "@/shared/types";

export function useUser(id: number | string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getUserDetails(id);
        setUser(data);
      } catch (err: any) {
        setError(err.message ?? "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return { user, loading, error };
}
